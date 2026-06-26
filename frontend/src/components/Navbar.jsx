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
        <header className="flex items-center justify-between gap-4 bg-slate-950 border-b border-slate-800 px-6 py-4">
            <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{t("appName")}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-900 p-1">
                    <button
                        type="button"
                        onClick={() => handleLanguageChange("en")}
                        className={`px-3 py-2 rounded-2xl text-sm font-medium transition ${language === "en" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                        {t("english")}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLanguageChange("ta")}
                        className={`px-3 py-2 rounded-2xl text-sm font-medium transition ${language === "ta" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                        {t("tamil")}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
                >
                    {t("logout")}
                </button>
            </div>
        </header>
    );
}

export default Navbar;
