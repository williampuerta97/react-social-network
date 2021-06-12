import { GET_PROFILE } from "../types";

// eslint-disable-next-line
export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                authUser: payload
            }
        default:
            return state
    }
}