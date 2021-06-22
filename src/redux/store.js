import { createStore } from "redux";
import reducer from './reducers'

const initialState = {
    loggedinUser : null,
    isLogged: false
}

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;