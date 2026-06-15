import { useEffect, useState } from "react";
import Layout from "../components/Layout";
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
    <Layout>

            <h1
                className="
                    text-4xl
                    font-bold
                    mb-8
                "
            >
                Dashboard
            </h1>

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                "
            >

                <DashboardCard
                    title="Revenue"
                    value="₹0"
                />

                <DashboardCard
                    title="Profit"
                    value="₹0"
                />

                <DashboardCard
                    title="Expenses"
                    value="₹0"
                />

                <DashboardCard
                    title="Waste"
                    value="₹0"
                />

            </div>

        </Layout>

    );
}

export default Dashboard;
