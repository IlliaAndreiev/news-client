import React from 'react';
import { getUser, removeUser } from '../serveses/tokenServeses';
import { withRouter } from 'react-router-dom';

const styles = {
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 99,
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getUser()
        };
    }
    handleLogout = () => {
        removeUser();
        this.props.history.push('/');
    }

    redirectToMain() {
        this.props.history.push('/')
    }

    render() {
        const { user } = this.state;

        return (
            <div style={styles.header}>
                {user &&
                    <header>
                        <div className="navbar navbar-dark bg-dark shadow-sm">
                            <div className="container d-flex">
                                <a onClick={() => this.props.history.push('/')} className="navbar-brand d-flex align-items-center">
                                    <div style={{ 'cursor': 'pointer', 'position': 'relative', 'fontSize': '18px', 'letterSpacing': '5px', 'color': 'rgb(207,207,207)', 'textShadow': '0px 0px 1px rgb(167,167,167),0px 1px 1px rgb(167,167,167),0px 2px 1px rgb(167,167,167), 1px 10px 30px rgba(0,0,0,0.8), 1px 10px 70px rgba(0,0,0,0.8), 0px 5px 5px rgba(0,0,0,0.8), -5px 5px 20px rgba(0,0,0,0.8), 5px 5px 20px rgba(0,0,0,0.8) 1px 1px 120px rgba(255,255,255,0.5)' }}>
                                        Games Ratings
                            </div>
                                </a>
                                {!user &&
                                    <a href="signin" className="btn btn-primary ml-auto mr-3">Sign In</a>
                                }

                                {user &&
                                    <div>
                                        <span style={{ 'color': 'white' }}>{user.username}</span>
                                        <button className="navbar-toggler ml-3" type="button" onClick={this.handleLogout}>
                                            Logout
                                </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </header>
                }
            </div>
        )
    }
}

export default withRouter(Header);