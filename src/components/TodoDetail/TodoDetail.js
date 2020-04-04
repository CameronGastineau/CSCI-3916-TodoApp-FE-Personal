import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Modal} from "react-bootstrap";

import {fetchTodo, updateTodo} from "../../actions/todoActions";

class TodoDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (!this.props.selectedTodo)
            dispatch(fetchTodo(this.props.id));
    }

    // updateTodoDetails = (event) => {
    //     let updateDetails = Object.assign({}, this.props.selectedTodo);
    //
    //     updateDetails[event.target.id] = event.target.value;
    //
    //     this.props.setSelectedTodo(updateDetails);
    // };

    // handleSubmitButtonClick() {
    //     const {dispatch} = this.props;
    //     dispatch(updateTodo(this.props.selectedTodo))
    //
    //     this.setState({
    //             badBool: false
    //         }
    //     )
    // }

    render() {
        const TodoDetails = ({todo}) => {

            if (todo === null) {
                return (
                    <div>Select a todo from the todo list to see details.</div>
                )
            }
            return (
                <div>
                    <p align={"center"}>Todo Created: {new Date(todo.dateCreated).toDateString()}</p>

                    <Form>
                        <Form.Group controlId={"name"}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.updateTodoDetails} value={todo.name}
                                          type="name" placeholder="TodoDetail Name"/>
                        </Form.Group>

                        <Form.Group controlId="priority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" onChange={this.updateTodoDetails} value={todo.priority}>
                                <option>Low</option>
                                <option>Med</option>
                                <option>High</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId={"dateDue"}>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control onChange={this.updateTodoDetails} value={todo.dateDue}
                                          type="date" placeholder="Due Date"/>
                        </Form.Group>

                        <Form.Group controlID={"completed"}>
                            <Form.Check onChange={this.updateTodoDetails} value={todo.completed}
                                        checked={todo.completed} type={"checkbox"}
                                        label={"Completed"}/>
                        </Form.Group>

                        <br/>
                    </Form>
                </div>
            )
        };

        return (
            <div>
                <Modal size="md"
                       show={this.props.showDetails && this.props.loggedIn}
                       centered={true}
                       enforceFocus={true}
                       onHide={this.props.closeDetail}
                >
                    <Modal.Header>
                        <Modal.Title className="mx-auto" id="TodoModalTitle">
                            <h1>Todo Details</h1>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <TodoDetails todo={this.props.todo}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            type="submit"
                            block
                            onClick={this.handleSubmitButtonClick}
                        >
                            Update TodoDetail
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        selectedTodo: state.todo.selectedTodo
    }
};

export default connect(mapStateToProps)(TodoDetail);