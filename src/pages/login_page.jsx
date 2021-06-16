import LoginForm from "../components/auth/login.component";

function LoginPage() {
  return (
    <div className="px-12 w-full flex">
      <div className="w-2/4 mx-auto py-4">
        <h1 className="text-center font-bold text-2xl">Iniciar sesión</h1>
        <div className="border border-gray-300 p-4 rounded mt-4">
          <div className="h-1/2">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

/* import { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";

function LoginPage() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => authContext.getProfile()}>Obtener usuario</button>
    </div>
  );
}

export default LoginPage; */
