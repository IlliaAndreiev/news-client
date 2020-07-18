import React from 'react'
import axios from 'axios'
import { setUser } from '../serveses/tokenServeses';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            userpassword: '',
            nameError: '',
      passwordError: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

      handleSubmit = (event) => {
          event.preventDefault();
        const {username, userpassword} = this.state

        if (username.length < 4) {
            this.setState({
              nameError: 'Required username min 4 symbols'
            });
          } else{ 
            this.setState({
              nameError: ''
            });
          }
      
          if (userpassword.length < 10) {
            this.setState({
              passwordError: 'Required password min 10 symbols'
            });
          } else{ 
            this.setState({
              passwordError: ''
            });
          }

          if (username.length > 4 && userpassword.length > 10) {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/sign-up',
            data: {
              username,
              userpassword,
            }
          }).then(res => {
            setUser(res.data);
            // this.props.setUser(res.data.id);
            this.props.history.push('/')
          }).catch(error => {
            console.log(error)
          });
        }
    }

    render() {
        const { nameError, passwordError } = this.state

        return (
            <form className="form-signin w-50 m-auto">
               <div style={{'width':'430px','padding': '60px 35px 35px 35px','border-radius': '40px','background': '#ecf0f3','box-shadow': '13px 13px 20px #cbced1'}}>
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <input name="username" value={this.state.username} onChange={this.handleChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" />
                {
          (nameError) ?
            <div className="invalid-feedback" style={{ 'display': 'block' }}>
              {nameError}
            </div>
            : 
            ''
        }
                <input name="userpassword" value={this.state.userpassword} onChange={this.handleChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                {
          (passwordError) ?
            <div className="invalid-feedback" style={{ 'display': 'block' }}>
              {passwordError}
            </div>
            : 
            ''
        }
                <input name="userpasswordconfirm" value={this.state.userpassword} type="password" id="inputPassword" className="form-control" placeholder="Password confirm" required="" />
                <button className="btn btn-lg btn-primary btn-block mt-5" onClick={this.handleSubmit}>Sign Up</button>
                <a href="/signin" className="btn btn-link">Sign in</a>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
                </div>
            </form>
        )
    }
}

export default withRouter(SignUp);