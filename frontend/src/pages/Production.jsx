import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useAuth";
import Layout from "../components/Layout";
import ProductionForm from "../components/ProductionForm";
import ProductionTable from "../components/ProductionTable";
import { getProductions, createProduction, deleteProduction } from "../services/productionService";

function Production() {
    const { t } = useTranslation();
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProductions();
    }, []);

    async function loadProductions() {
        try {
            setLoading(true);
            setError(null);
            const data = await getProductions();
            setProductions(data);
        } catch (err) {
            setError(t("failedLoadProductions") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(production) {
        try {
            setError(null);
            await createProduction(production);
            await loadProductions();
        } catch (err) {
            setError(t("failedCreateProduction") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        }
    }

    async function handleDelete(id) {
        try {
            setError(null);
            await deleteProduction(id);
            await loadProductions();
        } catch (err) {
            setError(t("failedDeleteProduction"));
            console.error(err);
        }
    }

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-6">{t("production")}</h1>

            {error && (
                <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <ProductionForm onSubmit={handleCreate} />

            {loading ? (
                <div className="text-center py-8">{t("loadingProductions")}</div>
            ) : (
                <ProductionTable productions={productions} onDelete={handleDelete} />
            )}
        </Layout>
    );
}

export default Production;