import { useTranslation } from "../hooks/useAuth";

function SalesTable({ sales }) {
    const { t } = useTranslation();
    if (!sales || sales.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl p-5 text-center text-gray-400">
                {t("noSales")}
            </div>
        );
    }

    return (
        <div className="bg-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left min-w-[360px]">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="pb-3 px-4">{t("item")}</th>
                        <th className="pb-3 px-4">{t("quantity")}</th>
                        <th className="pb-3 px-4">{t("date")}</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id} className="border-b border-slate-700 hover:bg-slate-700">
                            <td className="py-3 px-4">{sale.menu_item_name || `Item #${sale.menu_item}`}</td>
                            <td className="py-3 px-4"><span className="bg-blue-900 px-2 py-1 rounded text-sm">{sale.quantity_sold} {t("units")}</span></td>
                            <td className="py-3 px-4">{sale.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesTable;