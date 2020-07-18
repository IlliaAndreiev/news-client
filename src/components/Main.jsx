import React, { useEffect } from 'react';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Update from '../pages/Update';
import View from '../pages/View';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Admin from '../pages/Admin';
import { getUser } from '../serveses/tokenServeses';
import { connect } from 'react-redux';
import { setGames, setPlatforms } from '../redux/actions';
import GamesManager from '../api/games/Manager';
import PlatformsManager from '../api/platforms/Manager';
import { Button } from 'react-bootstrap';

import {
    Switch,
    Route,
    Redirect,
    withRouter,
} from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
    return {
        setGames: games => dispatch(setGames(games)),
        setPlatforms: platforms => dispatch(setPlatforms(platforms))
    }
}

const Main = ({ setGames, setPlatforms, history }) => {
    const user = getUser();

    useEffect(() => {
        GamesManager.search()
            .then((res) => {
                setGames(res.data.games)
            }).catch((e) => {
                console.error(e)
            })

        PlatformsManager.search()
            .then((res) => {
                setPlatforms(res.data.platforms)
            }).catch((e) => {
                console.error(e)
            })
    }, []);

    return (
        <main role="main">
            {user &&
                <section className="jumbotron text-center" >
                    <div className="container">
                        <h1>You can become a real gaming critic</h1>
                        <p className="lead text-muted">You can add new game or edit games's info! We will collect your information and put from the best to the worst.</p>
                        <p>
                            <Button className="mr-4" onClick={() => history.push('/create')}>Add game</Button>
                            <Button onClick={() => history.push('/')}>See other games</Button>
                        </p>
                    </div>
                </section>
            }

            <div className="album py-5 bg-light">
                <div className="container">
                    <Switch>
                        <Route path="/" exact render={() => (
                            user ? <Home /> : <Redirect to="/signin" />
                        )} />
                        <Route path="/create" exact render={() => (
                            user ? <Create /> : <Redirect to="/signin" />
                        )} />
                        <Route path="/update/:id" exact render={() => (
                            user ? <Update /> : <Redirect to="/signin" />
                        )} />
                        <Route path="/view/:id" exact render={() => (
                            user ? <View /> : <Redirect to="/signin" />
                        )} />
                        <Route path="/signin" exact render={() => (
                            user ? <Redirect to="/" /> : <SignIn />
                        )} />
                        <Route path="/signup" exact render={() => (
                            user ? <Redirect to="/" /> : <SignUp />
                        )} />
                        <Route path="/admin" exact render={() => (
                            user ? <Admin /> : <Redirect to="/signin" />
                        )} />
                    </Switch>
                </div>
            </div>
        </main>
    )
}
export default connect(null, mapDispatchToProps)(withRouter(Main));