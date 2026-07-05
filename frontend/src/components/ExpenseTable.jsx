import { useTranslation } from "../hooks/useAuth";

function ExpenseTable({ expenses, onDelete }) {
    const { t } = useTranslation();
    if (!expenses || expenses.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl p-5 text-center text-gray-400">
                {t("noExpenses")}
            </div>
        );
    }

    return (
        <div className="bg-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left min-w-[480px]">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="pb-3 px-4">{t("type")}</th>
                        <th className="pb-3 px-4">{t("amount")}</th>
                        <th className="pb-3 px-4">{t("date")}</th>
                        <th className="pb-3 px-4">{t("notes")}</th>
                        <th className="pb-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id} className="border-b border-slate-700 hover:bg-slate-700">
                            <td className="py-3 px-4"><span className="bg-orange-900 px-2 py-1 rounded text-sm">{expense.expense_type}</span></td>
                            <td className="py-3 px-4">₹{parseFloat(expense.amount).toFixed(2)}</td>
                            <td className="py-3 px-4">{expense.expense_date}</td>
                            <td className="py-3 px-4 text-gray-400 text-sm">{expense.notes || "-"}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onDelete(expense.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">{t("delete")}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseTable;
