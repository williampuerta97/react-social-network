import React, { useContext } from 'react'
import UserContext from '../context/User/UserContext'

function LoginPage() {

    const userContext = useContext(UserContext);
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => userContext.getProfile()}>Obtener usuario</button>
        </div>
    )
}

export default LoginPage
