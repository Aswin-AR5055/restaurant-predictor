import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

        try {

            await login(
                username,
                password
            );

            navigate("/dashboard");

        } catch (error) {

            console.error("Invalid Username or Password", error);
        }
    };

    return (
        <div>
            <h1>Restaurant Login</h1>

            <input
                placeholder="Username"
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;