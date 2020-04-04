import React, { Component, useState } from 'react';
import {connect} from 'react-redux';

import {Button, Modal} from "react-bootstrap";

import {fetchTodos, setTodo, updateTodo, deleteTodo} from "../../actions/todoActions";
import './TodoList.css'
import TodoDetail from "../TodoDetail/TodoDetail";

//TODO: DELETE THIS after API
let fakeTodos = [
    {
        _id: '5e80c41a05237c0004cb52fd',
        name: 'Test Todo',
        priority: null,
        dateDue: Date(),
        dateCreated: Date(),
        completed: false
    },
    {
        _id: '5e7fa19f31ac622374b62616',
        name: 'Test Todo 2',
        priority: null,
        dateDue: Date(),
        dateCreated: Date(),
        completed: false
    },
    {
        _id: '5e7fa19f31ac622374b62616',
        name: 'Completed Todo',
        priority: null,
        dateDue: Date(),
        dateCreated: Date(),
        completed: true
    }
];


class TodosList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetail: false
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchTodos());
    };

    setSelectedTodo = (todo) => {
        const {dispatch} = this.props;
        dispatch(setTodo(todo));
    };

    // createNewTodo = () => {
    //     let newTodo = {
    //         name: '',
    //         priority: null,
    //         dateDue: Date(),
    //         dateCreated: Date(),
    //         completed: false
    //     }
    //
    //     this.editSelectedTodo(newTodo);
    // };
    //
    editSelectedTodo = (todo) => {
        this.setSelectedTodo(todo);

        this.setState( {
            showDetail: true
        })

        //TODO: Do some editing
    };

    completeSelectedTodo = (todo) => {
        let updateDetails = Object.assign({}, todo);

        updateDetails["completed"] = true;

        this.updateSelectedTodo(updateDetails);
    };

    updateSelectedTodo = (todo) => {
        const {dispatch} = this.props;
        dispatch(updateTodo(todo));
    };

    deleteSelectedTodo = (todo) => {
        const {dispatch} = this.props;
        dispatch(deleteTodo(todo));
    };

    render() {

        const Todo = props => (
            <tr align={"left"}>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.name}</td>
                <td className={props.todo.completed ? 'completed' : null}>{new Date(props.todo.dateDue).toDateString()}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.priority}</td>
                <td className={props.todo.completed ? 'completed' : null}>{new Date(props.todo.dateCreated).toDateString()}</td>
                <td>
                    <EditButton todo={props.todo}/>
                </td>
                <td>
                    <button onClick={()=>this.completeSelectedTodo(props.todo)}>Mark Complete</button>
                </td>
                <td>
                    <button onClick={()=>this.deleteSelectedTodo(props.todo)}>Delete</button>
                </td>
            </tr>
        );

        const EditButton = ({todo}) => {
            const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

            return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Edit
                </Button>

                <TodoDetail showDetails={show} id={'badID'} closeDetail={handleClose} todo={todo}/>
            </>
            )
        };

        return (
            <div>
                <br/>
                <h3>Todos List</h3>
                <table align="center" className="table table-striped" style={{ marginTop: 20, width:"80%" }} >
                    <thead>
                    <tr align={"left"}>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody id={"tbody"}>

                    {/*//TODO: DELETE THIS WHEN API IS UP*/}
                    { fakeTodos.map((currentTodo, i) =>
                        <Todo todo={currentTodo} key={i}/>
                    )}

                    {/*//TODO: UNCOMMENT WHEN API IS UP*/}
                    {/*{ this.props.todos.map((currentTodo, i) =>*/}
                    {/*    <Todo todo={currentTodo} key={i}/>*/}
                    {/*)}*/}
                    </tbody>
                </table>

                <TodoDetail />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn,
        todos: state.todo.todos
    }
}

export default connect(mapStateToProps)(TodosList)