import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { getDashboardData } from "../services/dashboardService";

async function fetchAndSetDashboard(setData) {
    try {
        const result = await getDashboardData();
        setData(result);
    } catch (error) {
        console.error(error);
    }
}

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchAndSetDashboard(setData);
    }, []);

    if (!data) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Restaurant Dashboard</h1>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <DashboardCard title="Revenue" value={`₹${data.revenue}`} />
                <DashboardCard title="Profit" value={`₹${data.profit}`} />
                <DashboardCard title="Expenses" value={`₹${data.expenses}`} />
                <DashboardCard title="Waste Cost" value={`₹${data.waste_cost}`} />
            </div>
        </div>
    );
}

export default Dashboard;
