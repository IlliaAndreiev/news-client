import React from 'react'
import axios from 'axios'
import { setUser } from '../serveses/tokenServeses';
import { withRouter } from 'react-router-dom';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: [],
          username: 'iandreiev@gmail.com',
          userpassword: '1234',
        }   

        // this.handleChange = this.handleChange.bind(this);
    }
    // handleChange (event) {
      // this.setState({ [event.target.name]: event.target.value });
    // }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

      handleSubmit = (event) => {
        console.log("ee");
          event.preventDefault();
          const {username, userpassword} = this.state
        // const {username, userpassword} = this.state

        // if (username.length < 1) {
        //     this.setState({
        //       nameError: 'Required username'
        //     });
        //   } else{ 
        //     this.setState({
        //       nameError: ''
        //     });
        //   }
      
        //   if (userpassword.length < 1) {
        //     this.setState({
        //       passwordError: 'Required password'
        //     });
        //   } else{ 
        //     this.setState({
        //       passwordError: ''
        //     });
        //   }

          if (username.length > 0 && userpassword.length > 0) {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/login',
            data: {
              username ,
              userpassword,
            }
          }).then(res => {
            setUser(res.data);
              this.props.history.push('/')
          }).catch(error => {
            console.log('error', error)
          });
        }
      }
    render() {
        return (
            <form className="form-signin w-50 m-auto">
              <div style={{'width':'430px','padding': '60px 35px 35px 35px','border-radius': '40px','background': '#ecf0f3','box-shadow': '13px 13px 20px #cbced1'}}>
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                {/* <div class="ui left icon input loading">
                  <input type="text" placeholder="Search..." />
                  <i class="search icon"></i>
                </div> */}
                <label for="inputEmail" className="sr-only">Email address</label>
                <input name="username" value={this.state.username} onChange={this.handleChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" />
                <label for="inputPassword" className="sr-only">Password</label>
                <input name="userpassword" value={this.state.userpassword} onChange={this.handleChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                <button className="btn btn-lg btn-primary btn-block mt-5" onClick={this.handleSubmit}>Sign in</button>
                <a href="/signup" className="btn btn-link">Sign up</a>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
                </div>
            </form>
        )
    }
  }

export default withRouter(SignIn);