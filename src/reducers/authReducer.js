import {authActionTypes as authConstants} from '../constants'

const initialState = {
    loggedIn: !!localStorage.getItem('token'),
    username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
};

export default (state = initialState, action) => {

    const updated = Object.assign({}, state);

    switch(action.type) {
        case authConstants.USER_LOGGEDIN:
            updated['loggedIn'] = true;
            updated['username'] = action.username;
            return updated;

        case authConstants.USER_LOGOUT:
            updated['loggedIn'] = false;
            updated['username'] = '';
            return updated;

        default:
            return state;
    }
}