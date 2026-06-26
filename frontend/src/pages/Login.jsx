import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import { useTranslation } from "../hooks/useAuth";

function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert(t("invalidLogin"));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700">
                <h1 className="text-3xl font-bold text-white text-center mb-8">🍛 {t("appName")}</h1>

                <div className="mb-4">
                    <label className="text-gray-300 block mb-2">{t("username")}</label>
                    <input
                        type="text"
                        placeholder={t("enterUsername")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="text-gray-300 block mb-2">{t("password")}</label>
                    <input
                        type="password"
                        placeholder={t("enterPassword")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 p-3 rounded-xl font-semibold transition"
                >
                    {t("login")}
                </button>
            </div>
        </div>
    );
}

export default Login;
