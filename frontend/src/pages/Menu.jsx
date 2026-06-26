import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useAuth";
import Layout from "../components/Layout";
import MenuForm from "../components/MenuForm";
import MenuTable from "../components/MenuTable";
import {
    getMenuItems,
    createMenuItem,
    deleteMenuItem,
} from "../services/menuService";

function Menu() {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        loadMenuItems();

    }, []);

    async function loadMenuItems() {
        try {
            setLoading(true);
            setError(null);
            const data = await getMenuItems();
            setItems(data);
        } catch (err) {
            setError(t("failedLoadMenuItems") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(
        item
    ) {
        try {
            setError(null);
            await createMenuItem(
                item
            );
            await loadMenuItems();
        } catch (err) {
            setError(t("failedCreateMenuItem") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        }
    }

    async function handleDelete(
        id
    ) {
        try {
            setError(null);
            await deleteMenuItem(
                id
            );
            await loadMenuItems();
        } catch (err) {
            setError(t("failedDeleteMenuItem"));
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
                {t("menuManagement")}
            </h1>

            {error && (
                <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <MenuForm
                onSubmit={
                    handleCreate
                }
            />

            {loading ? (
                <div className="text-center py-8">
                    <p>{t("loadingMenuItems")}</p>
                </div>
            ) : (
                <MenuTable
                    items={items}
                    onDelete={
                        handleDelete
                    }
                />
            )}

        </Layout>
    );
}

export default Menu;