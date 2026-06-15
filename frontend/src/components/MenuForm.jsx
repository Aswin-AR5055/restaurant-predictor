import { useState } from "react";

function MenuForm({
    onSubmit
}) {

    const [form,
        setForm] =
        useState({
            name: "",
            category: "LUNCH",
            cost_price: 0,
            selling_price: 0,
        });

    function handleChange(
        e
    ) {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
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
                Add Menu Item
            </h2>

            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                "
            >

                <input
                    name="name"
                    placeholder="Item Name"
                    onChange={
                        handleChange
                    }
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

                <select
                    name="category"
                    onChange={
                        handleChange
                    }
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                >

                    <option value="BREAKFAST">
                        Breakfast
                    </option>

                    <option value="LUNCH">
                        Lunch
                    </option>

                    <option value="DINNER">
                        Dinner
                    </option>

                    <option value="SNACK">
                        Snack
                    </option>

                    <option value="DRINK">
                        Drink
                    </option>

                </select>

                <input
                    type="number"
                    name="cost_price"
                    placeholder="Cost Price"
                    onChange={
                        handleChange
                    }
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

                <input
                    type="number"
                    name="selling_price"
                    placeholder="Selling Price"
                    onChange={
                        handleChange
                    }
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

            </div>

            <button
                onClick={() =>
                    onSubmit(form)
                }
                className="
                    mt-4
                    bg-green-600
                    px-4
                    py-2
                    rounded
                "
            >
                Add Item
            </button>

        </div>
    );
}

export default MenuForm;