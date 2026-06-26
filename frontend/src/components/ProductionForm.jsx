import { useEffect, useState } from "react";
import { getMenuItems } from "../services/menuItemService";
import { useTranslation } from "../hooks/useAuth";

function ProductionForm({ onSubmit }) {
    const { t } = useTranslation();
    const [menuItems, setMenuItems] = useState([]);
    const [form, setForm] = useState({
        menu_item: "",
        quantity_prepared: "",
        date: new Date().toISOString().split("T")[0],
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadMenuItems();
    }, []);

    async function loadMenuItems() {
        try {
            const data = await getMenuItems();
            setMenuItems(data);
        } catch (err) {
            console.error(t("failedLoadMenuItems") + ":", err);
        }
    }

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
        if (!form.menu_item) {
            newErrors.menu_item = t("selectMenuItemRequired");
        }
        if (!form.quantity_prepared || parseInt(form.quantity_prepared) <= 0) {
            newErrors.quantity_prepared = t("quantityPositive");
        }
        if (!form.date) {
            newErrors.date = t("dateRequired");
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
                menu_item: parseInt(form.menu_item),
                quantity_prepared: parseInt(form.quantity_prepared),
                date: form.date,
            });
            setForm({
                menu_item: "",
                quantity_prepared: "",
                date: new Date().toISOString().split("T")[0],
            });
            setErrors({});
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-800 p-5 rounded-xl mb-6">
            <h2 className="text-xl font-bold mb-4">{t("recordProduction")}</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <select
                        name="menu_item"
                        value={form.menu_item}
                        onChange={handleChange}
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    >
                        <option value="">{t("selectMenuItem")}</option>
                        {menuItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.menu_item && <p className="text-red-400 text-sm mt-1">{errors.menu_item}</p>}
                </div>

                <div>
                    <input
                        type="number"
                        name="quantity_prepared"
                        placeholder={t("quantity")}
                        value={form.quantity_prepared}
                        onChange={handleChange}
                        min="1"
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.quantity_prepared && <p className="text-red-400 text-sm mt-1">{errors.quantity_prepared}</p>}
                </div>

                <div>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="bg-slate-700 p-2 rounded w-full text-white"
                    />
                    {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-white font-semibold cursor-pointer"
            >
                {loading ? t("adding") : t("recordProduction")}
            </button>
        </div>
    );
}

export default ProductionForm;
