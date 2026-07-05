import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useTranslation } from "../hooks/useAuth";

function Login() {
    const { t, language, setLanguage } = useTranslation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
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
            <form
                onSubmit={handleLogin}
                className="bg-slate-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700"
            >
                <div className="flex justify-end mb-6">
                    <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 p-0.5">
                        <button
                            type="button"
                            onClick={() => setLanguage("en")}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${language === "en" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-700"}`}
                        >
                            {t("english")}
                        </button>
                        <button
                            type="button"
                            onClick={() => setLanguage("ta")}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${language === "ta" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-700"}`}
                        >
                            {t("tamil")}
                        </button>
                    </div>
                </div>

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
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 p-3 rounded-xl font-semibold transition"
                >
                    {t("login")}
                </button>
            </form>
        </div>
    );
}

export default Login;
