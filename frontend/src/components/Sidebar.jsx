import { NavLink } from "react-router-dom";
import { useTranslation } from "../hooks/useAuth";

const links = [
    { path: "/dashboard", label: "dashboard", icon: "📊" },
    { path: "/inventory", label: "inventory", icon: "📦" },
    { path: "/menu", label: "menu", icon: "🍽️" },
    { path: "/sales", label: "sales", icon: "💰" },
    { path: "/production", label: "production", icon: "🏭" },
    { path: "/expenses", label: "expenses", icon: "🧾" },
];

function Sidebar() {
    const { t } = useTranslation();

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-64 bg-slate-900 min-h-screen flex-col p-6 border-r border-slate-800 shrink-0">
                <h2 className="text-xl font-bold mb-8 text-amber-300">🍛 {t("appName")}</h2>
                <nav className="space-y-1">
                    {links.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                                    isActive ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
                                }`
                            }
                        >
                            {t(label)}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 flex justify-around items-center h-16">
                {links.map(({ path, icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-0.5 text-xs px-2 py-1 rounded-lg transition ${
                                isActive ? "text-amber-400" : "text-slate-400"
                            }`
                        }
                    >
                        <span className="text-xl">{icon}</span>
                        <span>{t(label)}</span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
}

export default Sidebar;
