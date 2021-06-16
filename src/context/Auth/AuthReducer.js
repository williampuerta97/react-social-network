import { LOGIN } from "../types";

// eslint-disable-next-line
export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case LOGIN:
            return {
                ...state,
                authUser: payload
            }
        default:
            return state
    }
}