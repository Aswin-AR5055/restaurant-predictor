import { useState } from "react";
import { useTranslation } from "../hooks/useAuth";

function IngredientForm({ onSubmit }) {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        name: "",
        unit: "kg",
        current_stock: "",
        minimum_stock: "",
        cost_per_unit: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    function validate() {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = t("nameRequired");
        }
        if (!form.current_stock || parseFloat(form.current_stock) < 0) {
            newErrors.current_stock = t("stockNonNegative");
        }
        if (!form.minimum_stock || parseFloat(form.minimum_stock) < 0) {
            newErrors.minimum_stock = t("minimumStockNonNegative");
        }
        if (!form.cost_per_unit || parseFloat(form.cost_per_unit) <= 0) {
            newErrors.cost_per_unit = t("costPerUnitPositive");
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
                name: form.name.trim(),
                unit: form.unit,
                current_stock: parseFloat(form.current_stock),
                minimum_stock: parseFloat(form.minimum_stock),
                cost_per_unit: parseFloat(form.cost_per_unit),
            });
            setForm({
                name: "",
                unit: "kg",
                current_stock: "",
                minimum_stock: "",
                cost_per_unit: "",
            });
            setErrors({});
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-800 p-5 rounded-xl shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4">{t("addIngredient")}</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        name="name"
                        placeholder={t("name")}
                        value={form.name}
                        onChange={handleChange}
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <input
                        name="current_stock"
                        placeholder={t("stock")}
                        type="number"
                        value={form.current_stock}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.current_stock && <p className="text-red-400 text-sm mt-1">{errors.current_stock}</p>}
                </div>

                <div>
                    <input
                        name="minimum_stock"
                        placeholder={t("minimumStock")}
                        type="number"
                        value={form.minimum_stock}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.minimum_stock && <p className="text-red-400 text-sm mt-1">{errors.minimum_stock}</p>}
                </div>

                <div>
                    <input
                        name="cost_per_unit"
                        placeholder={t("costPerUnit")}
                        type="number"
                        value={form.cost_per_unit}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.cost_per_unit && <p className="text-red-400 text-sm mt-1">{errors.cost_per_unit}</p>}
                </div>

                <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="bg-slate-700 p-2 rounded text-white col-span-1"
                >
                    <option value="kg">{t("kg")}</option>
                    <option value="G">{t("g")}</option>
                    <option value="L">{t("l")}</option>
                    <option value="ML">{t("ml")}</option>
                    <option value="PCS">{t("pcs")}</option>
                </select>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-white font-semibold cursor-pointer"
            >
                {loading ? t("adding") : t("addIngredient")}
            </button>
        </div>
    );
}

export default IngredientForm;