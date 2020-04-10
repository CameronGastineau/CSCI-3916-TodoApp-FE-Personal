import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Modal} from "react-bootstrap";

// import {fetchTodo, updateTodo} from "../../actions/todoActions";

class TodoDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todoDetails: {
                _id: 'test',
                name: 'test',
                priority: 'test',
                dateCreated: Date(),
                dateDue: 'test',
                completed: false,
                order: 0
            }
        };

        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updateDetails = Object.assign({}, this.state.todoDetails);

        updateDetails[event.target.id] = event.target.value;

        console.log("handleChange")

        this.setState({
            todoDetails: updateDetails
        });
    }

    handleSubmitButtonClick() {
        //TODO: Once we get editing down, we should just be able to uncomment the below two lines to update.
        // const {dispatch} = this.props;
        // dispatch(updateTodo(this.props.selectedTodo))

        this.props.closeDetail()
    };

    render() {
        const TodoDetails = ({todo}) => {

            if (todo === undefined) {
                return (
                    <div>Select a todo from the todo list to see details.</div>
                )
            }
            return (
                <div>
                    <p align={"center"}>Todo Created: {new Date(todo.dateCreated).toDateString()}</p>

                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={this.handleChange}
                                value={todo.name}
                                name="name"
                                type="text"
                                placeholder="TodoDetail Name"
                            />
                        </Form.Group>

                        <Form.Group controlId="priority" name="priority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" onChange={this.handleChange} value={todo.priority}>
                                <option>Low</option>
                                <option>Med</option>
                                <option>High</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="dateDue" name="dateDue">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control onChange={this.handleChange} value={todo.dateDue}
                                          type="date" placeholder="Due Date"/>
                        </Form.Group>

                        <Form.Group controlId="completed" name="completed">
                            <Form.Check id="checkbox" onChange={this.handleChange} value={todo.completed} label={"Completed"} checked={todo.completed}/>
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
                     <TodoDetails todo={this.state.todoDetails}/>
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

const mapStateToProps = (state, ownProps) => {

    return {
        loggedIn: state.auth.loggedIn,
        selectedTodo: state.todo.selectedTodo,
        todo: ownProps.todo
    }
};

export default connect(mapStateToProps)(TodoDetail);