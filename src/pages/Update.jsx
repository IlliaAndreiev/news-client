import React from 'react';

class Update extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            username: '',
            email: '',
            description: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit() {
        let title = this.state.title;
        let username = this.state.username;
        let email = this.state.email;
        let description = this.state.description;

    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:4000/api/blog/create',
    //         data: {
    //           title,
    //           username,
    //           email,
    //           description
    //         }
    //       }).then(() => {
    //         this.setState({
    //             title: '',
    //         username: '',
    //         email: '',
    //         description: ''
    //         });

    //         window.location.href = "/"; 
    //       }).catch(error => {
    //           console.log(error)
    //       });
          
     }

    render() {
        return (
    <div className="order-md-1">
      <h4 className="mb-3">Blog's info</h4>
      <form className="needs-validation" novalidate="" />
            <label for="title">Blog's title</label>
            <input type="text" className="form-control" id="title" placeholder="Title..." value="" required="" />
            <div className="invalid-feedback">
              Valid Blod's title is required.
            </div>

        <div className="mb-3">
          <label for="description">Blog's Description</label>
          <input type="text" className="form-control" id="description" placeholder="Text..." required="" />
          <div className="invalid-feedback">
            Please enter Blog's description.
          </div>
        </div>

        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit">Update</button>
    </div>
        )
    }
}

export default Update;