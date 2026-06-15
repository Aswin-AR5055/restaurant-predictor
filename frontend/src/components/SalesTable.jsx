function SalesTable({
    sales
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

                        <th>
                            Item
                        </th>

                        <th>
                            Qty
                        </th>

                        <th>
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {sales.map(
                        sale => (

                            <tr
                                key={sale.id}
                            >

                                <td>
                                    {
                                        sale.menu_item_name
                                    }
                                </td>

                                <td>
                                    {
                                        sale.quantity_sold
                                    }
                                </td>

                                <td>
                                    {
                                        sale.date
                                    }
                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default SalesTable;