import { useTranslation, useAuth } from "../hooks/useAuth";

function Navbar() {
    const { language, setLanguage, t } = useTranslation();
    const { setAccessToken } = useAuth();

    const handleLanguageChange = (value) => {
        setLanguage(value);
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setAccessToken(null);
        window.location.href = "/";
    };

    return (
        <header className="flex items-center justify-between gap-2 bg-slate-950 border-b border-slate-800 px-4 py-3">
            <p className="text-xs uppercase tracking-widest text-slate-400 hidden sm:block">{t("appName")}</p>

            <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-0.5">
                    <button
                        type="button"
                        onClick={() => handleLanguageChange("en")}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${language === "en" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                        {t("english")}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLanguageChange("ta")}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${language === "ta" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                        {t("tamil")}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition"
                >
                    {t("logout")}
                </button>
            </div>
        </header>
    );
}

export default Navbar;
