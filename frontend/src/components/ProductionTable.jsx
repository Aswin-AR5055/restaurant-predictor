import { useTranslation } from "../hooks/useAuth";

function ProductionTable({ productions, onDelete }) {
    const { t } = useTranslation();
    if (!productions || productions.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl p-5 text-center text-gray-400">
                {t("noProductions")}
            </div>
        );
    }

    return (
        <div className="bg-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left min-w-[400px]">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="pb-3 px-4">{t("item")}</th>
                        <th className="pb-3 px-4">{t("quantity")}</th>
                        <th className="pb-3 px-4">{t("date")}</th>
                        <th className="pb-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {productions.map(production => (
                        <tr key={production.id} className="border-b border-slate-700 hover:bg-slate-700">
                            <td className="py-3 px-4">{production.menu_item_name || `Item #${production.menu_item}`}</td>
                            <td className="py-3 px-4"><span className="bg-blue-900 px-2 py-1 rounded text-sm">{production.quantity_prepared} {t("units")}</span></td>
                            <td className="py-3 px-4">{production.date}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onDelete(production.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">{t("delete")}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductionTable;
