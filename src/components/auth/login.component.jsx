import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Spinner from "../../assets/spinner.gif";

//Material React
import SnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

//Redux
import { useDispatch } from "react-redux";
import { LOGIN } from "../../redux/actions/types";

const LoginForm = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const [backendErrorMessage, setBackendErrorMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    setLoading(true);
    const resp = await axios.post("http://localhost:8000/api/login", data);
    
    console.log(resp);

    if (resp.data?.message) {
      setBackendErrorMessage(resp.data.message);
      setOpen(true);

      return setLoading(false);
    }

    localStorage.setItem("app-token", resp.data?.access_token);

    dispatch({
      type: LOGIN,
      payload: resp.data.user
    })
    history.push('/');
  };

  if (loading) {
    return (
      <div className="h-72 flex">
        <img className="mx-auto" src={Spinner} alt="Cargando..." />
      </div>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Correo */}
        <div className="flex mt-3">
          <label htmlFor="email" className="mx-auto font-bold">
            E-MAIL
          </label>
        </div>
        <input
          type="email"
          className="border-2 rounded-3xl w-full hover:border-gray-500 focus:outline-none px-2 py-1 text-gray-700"
          placeholder="william@gmail.com"
          {...register("email", {
            required: {
              value: true,
              message: "El campo Correo electrónico es requerido",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "La dirección de correo no es válida",
            },
          })}
        />
        <div className="text-red-600 text-center">{errors.email?.message}</div>

        {/* Correo */}
        <div className="flex mt-3">
          <label htmlFor="password" className="mx-auto font-bold">
            CONTRASEÑA
          </label>
        </div>
        <input
          type="password"
          className="border-2 rounded-3xl w-full hover:border-gray-500 focus:outline-none px-2 py-1 text-gray-700"
          placeholder="*******"
          autoComplete="true"
          {...register("password", {
            required: {
              value: true,
              message: "El campo Contraseña es requerido",
            },
          })}
        />
        <div className="text-red-600 text-center">
          {errors.password?.message}
        </div>

        <div className="w-full flex mt-3">
          <button className="mx-auto bg-blue-600 px-4 py-1 text-white rounded-3xl">
            Entrar
          </button>
        </div>
      </form>

      <SnackBar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="error">{backendErrorMessage}</Alert>
      </SnackBar>
    </>
  );
};

export default LoginForm;
