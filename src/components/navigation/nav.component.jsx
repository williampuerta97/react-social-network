import { BrowserRouter as Router, Switch, Route, NavLink, useHistory, withRouter } from "react-router-dom";
import HomePage from "../../pages/home_page";
import LoginPage from "../../pages/login_page";
import RegisterPage from "../../pages/register_page";
import "./nav.component.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { LOGOUT } from "../../redux/actions/types";

export const Nav = () => {

  const loggedinUser = useSelector(state => state.loggedinUser);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    const resp = await axios.post('http://localhost:8000/api/logout', {},{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization : `Bearer ${localStorage.getItem('app-token')}`
      }
    });

    if(resp.status === 200){
      localStorage.removeItem('app-token');
      dispatch({
        type: LOGOUT,
      });
      console.log(resp?.data.message);
      //history.push('/login');
    }
  }

  

  return (
    <Router>
      <div className="h-full">
        <nav className="w-full bg-blue-500 font-bold text-white h-14">
          <ul className="flex px-3 h-full ">
            <li className="flex">
              <NavLink to="/" exact className="my-auto p-2 flex rounded">
                <span className="my-auto">Social Network</span>
              </NavLink>
            </li>
            { isLogged && loggedinUser 
            ? (<>
                <li className="ml-auto px-3 flex">
                  <span className="my-auto p-2 flex rounded">
                    <span className="my-auto">{loggedinUser.name}</span>
                  </span>
                </li>
                <li className="px-3 flex">
                  <span className="my-auto p-2 flex rounded">
                    <button className="my-auto" onClick={()=> logout()}>Cerrar sesión</button>
                  </span>
                </li>
              </>) 
            : (<>
              <li className="ml-auto px-3 flex">
                <NavLink to="/login" className="my-auto p-2 flex rounded">
                  <span className="my-auto">Iniciar sesión</span>
                </NavLink>
              </li>
              <li className="px-3 flex">
                <NavLink to="/registro" className="my-auto p-2 flex rounded">
                  <span className="my-auto">Registrarse</span>
                </NavLink>
              </li>
            </>)}
          </ul>
        </nav>

        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/registro" component={RegisterPage} exact />
        </Switch>
      </div>
    </Router>
  );
};