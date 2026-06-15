function IngredientTable({
    ingredients,
    onDelete
}) {

    return (

        <div
            className="
                bg-slate-800
                rounded-xl
                p-5
                shadow-lg
            "
        >

            <table
                className="
                    w-full
                    text-left
                "
            >

                <thead>

                    <tr
                        className="
                            border-b
                            border-slate-700
                        "
                    >

                        <th>Name</th>
                        <th>Stock</th>
                        <th>Minimum</th>
                        <th>Unit</th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {ingredients.map(
                        (ingredient) => (

                            <tr
                                key={
                                    ingredient.id
                                }
                                className="
                                    border-b
                                    border-slate-700
                                "
                            >

                                <td>
                                    {ingredient.name}
                                </td>

                                <td>

                                    <span
                                        className={
                                            ingredient.current_stock <= ingredient.minimum_stock
                                                ? "text-red-400"
                                                : ""
                                        }
                                    >

                                        {
                                            ingredient.current_stock
                                        }

                                    </span>

                                </td>

                                <td>
                                    {
                                        ingredient.minimum_stock
                                    }
                                </td>

                                <td>
                                    {
                                        ingredient.unit
                                    }
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            onDelete(
                                                ingredient.id
                                            )
                                        }
                                        className="
                                            bg-red-600
                                            px-3
                                            py-1
                                            rounded
                                        "
                                    >
                                        Delete
                                    </button>

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