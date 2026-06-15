import {
    useEffect,
    useState
} from "react";

import {
    getMenuItems
} from "../services/menuItemService";

function SaleForm({
    onSubmit
}) {

    const [menuItems,
        setMenuItems] =
        useState([]);

    const [sale,
        setSale] =
        useState({
            menu_item: "",
            quantity_sold: 1,
            date: new Date()
                .toISOString()
                .split("T")[0],
        });

    useEffect(() => {

        loadMenuItems();

    }, []);

    async function loadMenuItems() {

        const data =
            await getMenuItems();

        setMenuItems(data);
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
                Record Sale
            </h2>

            <select
                className="
                    bg-slate-700
                    p-2
                    rounded
                    w-full
                    mb-4
                "
                value={sale.menu_item}
                onChange={(e) =>
                    setSale({
                        ...sale,
                        menu_item:
                            e.target.value
                    })
                }
            >

                <option value="">
                    Select Menu Item
                </option>

                {menuItems.map(item => (

                    <option
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </option>

                ))}

            </select>

            <input
                type="number"
                min="1"
                placeholder="Quantity"
                className="
                    bg-slate-700
                    p-2
                    rounded
                    w-full
                    mb-4
                "
                value={sale.quantity_sold}
                onChange={(e) =>
                    setSale({
                        ...sale,
                        quantity_sold:
                            e.target.value
                    })
                }
            />

            <button
                onClick={() =>
                    onSubmit(sale)
                }
                className="
                    bg-green-600
                    px-4
                    py-2
                    rounded
                "
            >
                Save Sale
            </button>

        </div>
    );
}

export default SaleForm;