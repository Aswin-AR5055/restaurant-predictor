import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useAuth";
import Layout from "../components/Layout";
import SaleForm from "../components/SaleForm";
import SalesTable from "../components/SalesTable";
import { getSales, createSale } from "../services/salesService";

function Sales() {
    const { t } = useTranslation();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSales();
    }, []);

    async function loadSales() {
        try {
            setLoading(true);
            setError(null);
            const data = await getSales();
            setSales(data);
        } catch (err) {
            setError(t("failedLoadSales") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(sale) {
        try {
            setError(null);
            await createSale(sale);
            await loadSales();
        } catch (err) {
            setError(t("failedCreateSale") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        }
    }

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-6">{t("sales")}</h1>

            {error && (
                <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <SaleForm onSubmit={handleCreate} />

            {loading ? (
                <div className="text-center py-8">{t("loadingSales")}</div>
            ) : (
                <SalesTable sales={sales} />
            )}
        </Layout>
    );
}

export default Sales;