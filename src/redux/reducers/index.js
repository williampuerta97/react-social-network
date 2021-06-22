import { LOGIN, LOGOUT } from "../actions/types";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedinUser: action.payload,
                isLogged: true
            };
        case LOGOUT:
            return {
                ...state,
                loggedinUser: null,
                isLogged: false
            };

        default:
            return state;
    }
}

export default authReducer;