import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { getDashboardData } from "../services/dashboardService";
import { useTranslation } from "../hooks/useAuth";

function Dashboard() {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoading(true);
            setError(null);
            const result = await getDashboardData();
            setData(result);
        } catch (err) {
            setError(t("noData"));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-12">{t("loading")}</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="bg-red-900 text-red-100 p-4 rounded-lg">{error}</div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div className="text-center py-12">{t("noData")}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{t("dashboard")}</h1>
                    <p className="text-slate-400 max-w-2xl">{t("appName")} {t("dashboard")} {t("dashboardOverview")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title={t("revenue")} value={`₹${parseFloat(data.revenue || 0).toFixed(2)}`} />
                    <DashboardCard title={t("profit")} value={`₹${parseFloat(data.profit || 0).toFixed(2)}`} />
                    <DashboardCard title={t("expensesToday")} value={`₹${parseFloat(data.expenses || 0).toFixed(2)}`} />
                    <DashboardCard title={t("wasteCost")} value={`₹${parseFloat(data.waste_cost || 0).toFixed(2)}`} />
                </div>

                {data.top_items && data.top_items.length > 0 && (
                    <div className="bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-700">
                        <h2 className="text-2xl font-bold mb-4">{t("topItems")}</h2>
                        <ul className="space-y-3">
                            {data.top_items.map((item, idx) => (
                                <li key={idx} className="text-gray-300">
                                    {item.menu_item__name || item.name || "Unnamed item"} — sold {item.sold}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.low_stock && data.low_stock.length > 0 && (
                    <div className="bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-700">
                        <h2 className="text-2xl font-bold mb-4 text-orange-400">{t("lowStockItems")}</h2>
                        <ul className="space-y-2 text-orange-300">
                            {data.low_stock.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Dashboard;
