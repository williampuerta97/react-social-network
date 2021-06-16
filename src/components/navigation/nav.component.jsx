import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import HomePage from "../../pages/home_page";
import LoginPage from "../../pages/login_page";
import RegisterPage from "../../pages/register_page";
import "./nav.component.css";

export const Nav = () => {
  const { authUser } = useContext(AuthContext);

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
            {authUser ?? <p>{authUser?.first_name}</p>}
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
