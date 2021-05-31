import React from 'react'
import RegisterForm from '../components/auth/register.component';

function RegisterPage() {
    return (
        <div className="px-12 w-full flex">
            <div className="w-2/4 mx-auto py-4">
                <h1 className="text-center font-bold text-2xl">Registrarse</h1>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage
