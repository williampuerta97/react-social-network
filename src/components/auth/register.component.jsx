import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../assets/spinner.gif";
import SnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const backendErrorsInitialValue = { name: "", email: "", password: ""};
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [backendErrors, setBackendErrors] = useState(backendErrorsInitialValue);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    
    setLoading(true);
    const resp = await axios.post("http://localhost:8000/api/register", data);

    if (resp.data?.errors) {
      const { name, email, password } = resp.data?.errors;
      setBackendErrors({ name, email, password });
      return setLoading(false);
    }

    setBackendErrors(backendErrorsInitialValue);
    setLoading(false);
    setOpen(true);
    reset();
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
        {/* Nombre */}
        <div className="flex mt-3">
          <label htmlFor="name" className="mx-auto font-bold">
            NOMBRE
          </label>
        </div>
        <input
          type="text"
          className="border-2 rounded-3xl w-full hover:border-gray-500 focus:outline-none px-2 py-1 text-gray-700"
          placeholder="William"
          autoFocus
          {...register("name", {
            required: {
              value: true,
              message: "El campo Nombre es requerido",
            },
          })}
        />
        <div className="text-red-600 text-center">{errors.name?.message}</div>

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
        <div className="text-red-600 text-center">
          {errors.email?.message}
          {backendErrors?.email}
        </div>

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
          {backendErrors?.password}
        </div>

        <div className="w-full flex mt-3">
          <button className="mx-auto bg-blue-600 px-4 py-1 text-white rounded-3xl">
            Registrar
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
        <Alert severity="info">Usuario registrado correctamente</Alert>
      </SnackBar>
    </>
  );
};

export default RegisterForm;
