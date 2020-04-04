import React, { Component } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import TodosList from "../components/TodoList/TodoList";

class BaseRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={withRouter(TodosList)}/>
            </Switch>
        )
    }
}

export default BaseRouter;