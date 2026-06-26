import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useAuth";
import Layout from "../components/Layout";
import IngredientForm from "../components/IngredientForm";
import IngredientTable from "../components/IngredientTable";
import {
    getIngredients,
    createIngredient,
    deleteIngredient,
} from "../services/ingredientService";

function Inventory() {
    const { t } = useTranslation();
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadIngredients();
    }, []);

    async function loadIngredients() {
        try {
            setLoading(true);
            setError(null);
            const data = await getIngredients();
            setIngredients(data);
        } catch (err) {
            setError(t("failedLoadIngredients") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(ingredient) {
        try {
            setError(null);
            await createIngredient(ingredient);
            await loadIngredients();
        } catch (err) {
            setError(t("failedCreateIngredient") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        }
    }

    async function handleDelete(id) {
        try {
            setError(null);
            await deleteIngredient(id);
            await loadIngredients();
        } catch (err) {
            setError(t("failedDeleteIngredient"));
            console.error(err);
        }
    }

    return (

        <Layout>

            <h1
                className="
                    text-4xl
                    font-bold
                    mb-6
                "
            >
                {t("inventory")}
            </h1>

            {error && (
                <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <IngredientForm onSubmit={handleCreate} />

            {loading ? (
                <div className="text-center py-8">{t("loadingIngredients")}</div>
            ) : (
                <IngredientTable
                    ingredients={ingredients}
                    onDelete={handleDelete}
                />
            )}

        </Layout>
    );
}

export default Inventory;