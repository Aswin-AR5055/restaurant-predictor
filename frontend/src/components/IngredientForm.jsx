import { useState } from "react";

function IngredientForm({
    onSubmit
}) {

    const [form, setForm] =
        useState({
            name: "",
            unit: "KG",
            current_stock: 0,
            minimum_stock: 0,
            cost_per_unit: 0,
        });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    return (

        <div
            className="
                bg-slate-800
                p-5
                rounded-xl
                shadow-lg
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
                Add Ingredient
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
                    placeholder="Name"
                    onChange={handleChange}
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

                <input
                    name="current_stock"
                    placeholder="Stock"
                    type="number"
                    onChange={handleChange}
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

                <input
                    name="minimum_stock"
                    placeholder="Minimum Stock"
                    type="number"
                    onChange={handleChange}
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

                <input
                    name="cost_per_unit"
                    placeholder="Cost"
                    type="number"
                    onChange={handleChange}
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                />

                <select
                    name="unit"
                    onChange={handleChange}
                    className="
                        bg-slate-700
                        p-2
                        rounded
                    "
                >

                    <option value="KG">
                        KG
                    </option>

                    <option value="G">
                        G
                    </option>

                    <option value="L">
                        L
                    </option>

                    <option value="ML">
                        ML
                    </option>

                    <option value="PCS">
                        PCS
                    </option>

                </select>

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
                Add Ingredient
            </button>

        </div>

    );
}

export default IngredientForm;