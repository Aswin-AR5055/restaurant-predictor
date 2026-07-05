import { useTranslation } from "../hooks/useAuth";

function IngredientTable({
    ingredients,
    onDelete
}) {
    const { t } = useTranslation();

    return (

        <div className="bg-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left min-w-[400px]">

                <thead>

                    <tr className="border-b border-slate-700">
                        <th className="pb-3 px-4">{t("name")}</th>
                        <th className="pb-3 px-4">{t("stock")}</th>
                        <th className="pb-3 px-4">{t("minimumStock")}</th>
                        <th className="pb-3 px-4">{t("unit")}</th>
                        <th className="pb-3 px-4"></th>
                    </tr>

                </thead>

                <tbody>

                    {ingredients.map(
                        (ingredient) => (

                        <tr key={ingredient.id} className="border-b border-slate-700 hover:bg-slate-700">
                            <td className="py-3 px-4">{ingredient.name}</td>
                            <td className="py-3 px-4">
                                <span className={ingredient.current_stock <= ingredient.minimum_stock ? "text-red-400" : ""}>
                                    {ingredient.current_stock}
                                </span>
                            </td>
                            <td className="py-3 px-4">{ingredient.minimum_stock}</td>
                            <td className="py-3 px-4">{ingredient.unit}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onDelete(ingredient.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">{t("delete")}</button>
                            </td>
                        </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );
}

export default IngredientTable;