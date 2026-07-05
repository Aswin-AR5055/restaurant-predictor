import { useState } from "react";
import { useTranslation } from "../hooks/useAuth";

function MenuForm({ onSubmit }) {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        name: "",
        category: "LUNCH",
        cost_price: "",
        selling_price: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }

    function validate() {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = t("itemNameRequired");
        }
        if (!form.cost_price || parseFloat(form.cost_price) < 0) {
            newErrors.cost_price = t("costPricePositive");
        }
        if (!form.selling_price || parseFloat(form.selling_price) < 0) {
            newErrors.selling_price = t("sellingPricePositive");
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
                category: form.category,
                cost_price: parseFloat(form.cost_price),
                selling_price: parseFloat(form.selling_price),
            });
            setForm({
                name: "",
                category: "LUNCH",
                cost_price: "",
                selling_price: "",
            });
            setErrors({});
        } finally {
            setLoading(false);
        }
    }

    return (

        <div
            className="
                bg-slate-800
                p-5
                rounded-xl
                mb-6
            "
        >

            <h2
                className="
                    text-xl
                    font-bold
                    mb-4
                "
            >
                {t("addMenuItem")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                    <input
                        name="name"
                        placeholder={t("itemName")}
                        value={form.name}
                        onChange={handleChange}
                        className="
                            bg-slate-700
                            p-2
                            rounded
                            w-full
                            text-white
                        "
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="
                        bg-slate-700
                        p-2
                        rounded
                        text-white
                    "
                >

                    <option value="BREAKFAST">{t("breakfast")}</option>

                    <option value="LUNCH">{t("lunch")}</option>

                    <option value="DINNER">{t("dinner")}</option>

                    <option value="SNACK">{t("snack")}</option>

                    <option value="DRINK">{t("drink")}</option>

                </select>

                <div>
                    <input
                        type="number"
                        name="cost_price"
                        placeholder={t("costPrice")}
                        value={form.cost_price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="
                            bg-slate-700
                            p-2
                            rounded
                            w-full
                            text-white
                        "
                    />
                    {errors.cost_price && <p className="text-red-400 text-sm mt-1">{errors.cost_price}</p>}
                </div>

                <div>
                    <input
                        type="number"
                        name="selling_price"
                        placeholder={t("sellingPrice")}
                        value={form.selling_price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="
                            bg-slate-700
                            p-2
                            rounded
                            w-full
                            text-white
                        "
                    />
                    {errors.selling_price && <p className="text-red-400 text-sm mt-1">{errors.selling_price}</p>}
                </div>

            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                    mt-4
                    bg-green-600
                    hover:bg-green-700
                    disabled:bg-gray-600
                    px-4
                    py-2
                    rounded
                    text-white
                    font-semibold
                    cursor-pointer
                "
            >
                {loading ? t("adding") : t("addItem")}
            </button>

        </div>
    );
}

export default MenuForm;