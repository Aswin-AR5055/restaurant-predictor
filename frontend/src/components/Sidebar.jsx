import { NavLink } from "react-router-dom";
import { useTranslation } from "../hooks/useAuth";

function Sidebar() {
    const { t } = useTranslation();

    return (
        <aside className="w-72 bg-slate-900 min-h-screen p-8 border-r border-slate-800">
            <h2 className="text-2xl font-bold mb-8 text-amber-300">🍛 {t("appName")}</h2>

            <nav className="space-y-3">
                {[
                    ["/dashboard", t("dashboard")],
                    ["/inventory", t("inventory")],
                    ["/menu", t("menu")],
                    ["/sales", t("sales")],
                    ["/production", t("production")],
                    ["/expenses", t("expenses")],
                ].map(([path, label]) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `block p-3 rounded-xl text-sm font-medium transition ${
                                isActive ? "bg-slate-800 shadow" : "hover:bg-slate-800"
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
