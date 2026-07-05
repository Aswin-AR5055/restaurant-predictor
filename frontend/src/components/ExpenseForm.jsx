import { useState } from "react";
import { useTranslation } from "../hooks/useAuth";

function ExpenseForm({ onSubmit }) {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        expense_type: "RENT",
        amount: "",
        expense_date: new Date().toISOString().split("T")[0],
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const expenseTypes = [
        { value: "RENT", label: t("rent") },
        { value: "SALARY", label: t("salary") },
        { value: "GAS", label: t("gas") },
        { value: "ELECTRICITY", label: t("electricity") },
        { value: "WATER", label: t("water") },
        { value: "INTERNET", label: t("internet") },
        { value: "OTHER", label: t("other") },
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    }

    function validate() {
        const newErrors = {};
        if (!form.amount || parseFloat(form.amount) <= 0) {
            newErrors.amount = t("amountPositive");
        }
        if (!form.expense_date) {
            newErrors.expense_date = t("dateRequired");
        }
        return newErrors;
    }

    async function handleSubmit() {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await onSubmit({
                expense_type: form.expense_type,
                amount: parseFloat(form.amount),
                expense_date: form.expense_date,
                notes: form.notes.trim(),
            });
            setForm({
                expense_type: "RENT",
                amount: "",
                expense_date: new Date().toISOString().split("T")[0],
                notes: "",
            });
            setErrors({});
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-800 p-5 rounded-xl mb-6">
            <h2 className="text-xl font-bold mb-4">{t("recordExpense")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                    name="expense_type"
                    value={form.expense_type}
                    onChange={handleChange}
                    className="bg-slate-700 p-2 rounded text-white"
                >
                    {expenseTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>

                <div>
                    <input
                        type="number"
                        name="amount"
                        placeholder={t("amount")}
                        value={form.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount}</p>}
                </div>

                <div>
                    <input
                        type="date"
                        name="expense_date"
                        value={form.expense_date}
                        onChange={handleChange}
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.expense_date && <p className="text-red-400 text-sm mt-1">{errors.expense_date}</p>}
                </div>

                <input
                    name="notes"
                    placeholder={t("notesOptional")}
                    value={form.notes}
                    onChange={handleChange}
                    className="bg-slate-700 p-2 rounded text-white col-span-1"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-white font-semibold cursor-pointer"
            >
                {loading ? t("adding") : t("addExpense")}
            </button>
        </div>
    );
}

export default ExpenseForm;
