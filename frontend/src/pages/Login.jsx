import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            await login(
                username,
                password
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                "Invalid username or password"
            );
        }
    };

    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-900
            "
        >

            <div
                className="
                    bg-slate-800
                    p-8
                    rounded-2xl
                    shadow-2xl
                    w-96
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-white
                        text-center
                        mb-8
                    "
                >
                    🍛 Shanmugavel unavagam
                </h1>

                <div className="mb-4">

                    <label
                        className="
                            text-gray-300
                            block
                            mb-2
                        "
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        className="
                            w-full
                            p-3
                            rounded-lg
                            bg-slate-700
                            text-white
                            outline-none
                            border
                            border-slate-600
                            focus:border-blue-500
                        "
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-6">

                    <label
                        className="
                            text-gray-300
                            block
                            mb-2
                        "
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        className="
                            w-full
                            p-3
                            rounded-lg
                            bg-slate-700
                            text-white
                            outline-none
                            border
                            border-slate-600
                            focus:border-blue-500
                        "
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    onClick={handleLogin}
                    className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        p-3
                        rounded-lg
                        font-semibold
                        transition
                    "
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;