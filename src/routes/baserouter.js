import React, { Component } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import TodosList from "../components/TodoList/TodoList";
import TodoDetail from "../components/TodoDetail/TodoDetail";

class BaseRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={withRouter(TodosList)}/>
                <Route path="/todo" component={withRouter(TodoDetail)}/>
                <Route path="/todo/:id" component={withRouter(TodoDetail)}/>
            </Switch>
        )
    }
}

export default BaseRouter;