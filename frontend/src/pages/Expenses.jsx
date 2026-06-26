import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useAuth";
import Layout from "../components/Layout";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import { getExpenses, createExpense, deleteExpense } from "../services/expenseService";

function Expenses() {
    const { t } = useTranslation();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadExpenses();
    }, []);

    async function loadExpenses() {
        try {
            setLoading(true);
            setError(null);
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            setError(t("failedLoadExpenses") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(expense) {
        try {
            setError(null);
            await createExpense(expense);
            await loadExpenses();
        } catch (err) {
            setError(t("failedCreateExpense") + ": " + (err.response?.data?.detail || err.message));
            console.error(err);
        }
    }

    async function handleDelete(id) {
        try {
            setError(null);
            await deleteExpense(id);
            await loadExpenses();
        } catch (err) {
            setError(t("failedDeleteExpense"));
            console.error(err);
        }
    }

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-6">{t("expenses")}</h1>

            {error && (
                <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <ExpenseForm onSubmit={handleCreate} />

            {loading ? (
                <div className="text-center py-8">{t("loadingExpenses")}</div>
            ) : (
                <ExpenseTable expenses={expenses} onDelete={handleDelete} />
            )}
        </Layout>
    );
}

export default Expenses;