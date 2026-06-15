import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside
            className="
                w-72
                bg-slate-800
                min-h-screen
                p-8
                text-white
            "
        >
            <h2 className="text-2xl font-bold mb-8">
                🍛 Restaurant Manager
            </h2>

            <nav className="space-y-3">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block p-3 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                        `block p-3 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                    }
                >
                    Inventory
                </NavLink>

                <NavLink
                    to="/menu"
                    className={({ isActive }) =>
                        `block p-3 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                    }
                >
                    Menu
                </NavLink>

                <NavLink
                    to="/sales"
                    className={({ isActive }) =>
                        `block p-3 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                    }
                >
                    Sales
                </NavLink>
                <NavLink
                    to="/production"
                    className={({ isActive }) =>
                        `block p-3 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                    }
                >
                    Production
                </NavLink>
                <NavLink
                    to="/expenses"
                    className={({ isActive }) =>
                        `block p-3 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                    }
                >
                    Expenses
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
