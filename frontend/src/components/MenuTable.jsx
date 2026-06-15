function MenuTable({
    items,
    onDelete
}) {

    return (

        <div
            className="
                bg-slate-800
                rounded-xl
                p-5
            "
        >

            <table
                className="
                    w-full
                "
            >

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Category</th>

                        <th>
                            Cost Price
                        </th>

                        <th>
                            Selling Price
                        </th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {items.map(
                        item => (

                            <tr
                                key={item.id}
                            >

                                <td>
                                    {item.name}
                                </td>

                                <td>
                                    {
                                        item.category
                                    }
                                </td>

                                <td>
                                    ₹
                                    {
                                        item.cost_price
                                    }
                                </td>

                                <td>
                                    ₹
                                    {
                                        item.selling_price
                                    }
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            onDelete(
                                                item.id
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

export default MenuTable;