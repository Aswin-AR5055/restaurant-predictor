import { useTranslation } from "../hooks/useAuth";

function MenuTable({
    items,
    onDelete
}) {
    const { t } = useTranslation();

    if (!items || items.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl p-5 text-center text-gray-400">
                {t("noMenuItems")}
            </div>
        );
    }

    return (

        <div className="bg-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">

                <thead>

                    <tr className="border-b border-slate-700">
                        <th className="pb-3 px-4">{t("itemName")}</th>
                        <th className="pb-3 px-4">{t("category")}</th>
                        <th className="pb-3 px-4">{t("costPrice")}</th>
                        <th className="pb-3 px-4">{t("sellingPrice")}</th>
                        <th className="pb-3 px-4">{t("margin")}</th>
                        <th className="pb-3 px-4"></th>

                    </tr>

                </thead>

                <tbody>

                    {items.map(
                        item => {
                            const margin = item.selling_price - item.cost_price;
                            const marginPercent = item.cost_price > 0 ? ((margin / item.cost_price) * 100).toFixed(1) : 0;
                            
                            return (
                                <tr
                                    key={item.id}
                                    className="border-b border-slate-700 hover:bg-slate-700"
                                >
                                    <td className="py-3 px-4">{item.name}</td>
                                    <td className="py-3 px-4"><span className="bg-blue-900 px-2 py-1 rounded text-sm">{item.category}</span></td>
                                    <td className="py-3 px-4">₹{parseFloat(item.cost_price).toFixed(2)}</td>
                                    <td className="py-3 px-4">₹{parseFloat(item.selling_price).toFixed(2)}</td>
                                    <td className="py-3 px-4"><span className={margin >= 0 ? "text-green-400" : "text-red-400"}>₹{parseFloat(margin).toFixed(2)} ({marginPercent}%)</span></td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => onDelete(item.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">{t("delete")}</button>
                                    </td>
                                </tr>
                            );
                        }
                    )}

                </tbody>

            </table>

        </div>

    );
}

export default MenuTable;