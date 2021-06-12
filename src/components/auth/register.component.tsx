import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterFormData = {
    name: string,
    email: string,
    password: string
}

const RegisterForm: React.FC = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<RegisterFormData>();

    const onSubmit: SubmitHandler<RegisterFormData> = data => {
        console.log(data);
    }

    //console.log(watch("name"));

    return (
        <div className="border-2 border-gray-500 p-4 rounded mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="h-1/2">
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
                    {errors.email?.message}
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
                    {errors.password?.message}
                </div>

                <div className="w-full flex mt-3">
                    <button className="mx-auto bg-red-600 px-2 py-1 text-white rounded-3xl">Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;