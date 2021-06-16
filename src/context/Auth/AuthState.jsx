import { useReducer } from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import { LOGIN } from "../types";

const AuthState = (props) => {
  const initialState = {
    authUser: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/users/1");
      const { data } = res;

      console.log(data.data);

      dispatch({ type: LOGIN, payload: data.data.first_name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: state.authUser,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
