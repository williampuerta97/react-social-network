import { useReducer } from "react";
import axios from "axios";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { GET_PROFILE } from "../types";

const UserState = (props) => {

    const initialState = {
        authUser: null
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getProfile = async () => {
        try {
            const res = await axios.get("https://reqres.in/api/users/1");
            const { data } = res;

            console.log(data.data);

            dispatch({ type: GET_PROFILE, payload: data.data.first_name })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <UserContext.Provider
            value={{
                authUser: state.authUser,
                getProfile
            }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;