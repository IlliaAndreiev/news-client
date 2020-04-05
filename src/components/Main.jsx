import React from 'react';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Update from '../pages/Update';
import View from '../pages/View';
import SignIn from '../pages/SignIn';

import {
    Switch,
    Route,
  } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main role="main">
                <section class="jumbotron text-center">
                    <div class="container">
                    <h1>You can become a real newshawk</h1>
                    <p class="lead text-muted">You can create your own new's blog that will be popular among other peoples, or you can view all blogs that had been created!</p>
                    <p>
                        <a href="create" class="btn btn-primary my-2 mr-3">Create your blog</a>
                        <a href="/" class="btn btn-secondary my-2 ml-3">Other blogs</a>
                    </p>
                    </div>
                </section>

                <div class="album py-5 bg-light">
                    <div class="container">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/create" exact component={Create} />
                            <Route path="/update" exact component={Update} />
                            <Route path="/view" exact component={View} />
                            <Route path="/signin" exact component={SignIn} />
                        </Switch>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main;