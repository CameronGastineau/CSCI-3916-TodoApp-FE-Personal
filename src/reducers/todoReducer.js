import {todoActionTypes as todoConstants} from '../constants'

const initialState = {
    todos: [],
    selectedTodo: null
};

export default (state = initialState, action) => {

    const updated = Object.assign({}, state);

    switch(action.type) {
        case todoConstants.FETCH_TODOS:
            updated['todos'] = action.todos;
            updated['selectedTodo'] = action.selectedTodo;
            return updated;
        case todoConstants.FETCH_TODO:
        case todoConstants.SET_TODO:
        case todoConstants.CREATE_TODO:
        case todoConstants.UPDATE_TODO:
            updated['selectedTodo'] = action.selectedTodo;
            return updated;
        case todoConstants.DELETE_TODO:
            updated['selectedTodo'] = null;
            return updated;
        default:
            return state;
    }
}