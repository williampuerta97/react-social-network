import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/auth/register.component';

function RegisterPage() {

    const history = useHistory();


    useEffect(() => {
        const token = localStorage.getItem('app-token');

        if (token) {
            return history.push('/')
        }
    }, [history]);


    return (
        <div className="px-12 w-full flex">
            <div className="w-2/4 mx-auto py-4">
                <h1 className="text-center font-bold text-2xl">Registrarse</h1>
                <div className="border border-gray-300 p-4 rounded mt-4">
                    <div className="h-1/2">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
