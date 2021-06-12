import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from '../../assets/spinner.jpg';

type RegisterFormData = {
    name: string,
    email: string,
    password: string
}

const RegisterForm: React.FC = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<RegisterFormData>();
    const [backendErrors, setBackendErrors] = useState<RegisterFormData>({
        name: '', email: '', password: ''
    });
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setLoading(true);
        const resp: any = await axios.post('http://localhost:8000/api/register', data);

        const { name, email, password }: RegisterFormData = resp.data.errors;
        setBackendErrors({ name, email, password });
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="h-72">
                <img src={Spinner} alt="Cargando..." />
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre */}
            <div className="flex mt-3">
                <label htmlFor="name" className="mx-auto">Nombre</label>
            </div>
            <input
                type="text"
                className="border-2 rounded-3xl w-full hover:border-gray-500 focus:outline-none px-2 py-1 text-gray-700"
                placeholder="William"
                autoFocus
                {...register("name", {
                    required: {
                        value: true,
                        message: 'El campo Nombre es requerido'
                    }
                })}
            />
            <div className="text-red-600 text-center">
                {errors.name?.message}
            </div>

            {/* Correo */}
            <div className="flex mt-3">
                <label htmlFor="email" className="mx-auto">Correo electrónico</label>
            </div>
            <input
                type="email"
                className="border-2 rounded-3xl w-full hover:border-gray-500 focus:outline-none px-2 py-1 text-gray-700"
                placeholder="william@gmail.com"
                {...register("email", {
                    required: {
                        value: true,
                        message: 'El campo Correo electrónico es requerido'
                    },
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'La dirección de correo no es válida'
                    },

                })}
            />
            <div className="text-red-600 text-center">
                {errors.email?.message}{backendErrors.email}
            </div>

            {/* Correo */}
            <div className="flex mt-3">
                <label htmlFor="password" className="mx-auto">Contraseña</label>
            </div>
            <input
                type="password"
                className="border-2 rounded-3xl w-full hover:border-gray-500 focus:outline-none px-2 py-1 text-gray-700"
                placeholder="*******"
                autoComplete="true"
                {...register("password", {
                    required: {
                        value: true,
                        message: 'El campo Contraseña es requerido'
                    }
                })}
            />
            <div className="text-red-600 text-center">
                {errors.password?.message}{backendErrors.password}
            </div>

            <div className="w-full flex mt-3">
                <button className="mx-auto bg-red-600 px-2 py-1 text-white rounded-3xl">Registrar</button>
            </div>
        </form>
    )
}

export default RegisterForm;