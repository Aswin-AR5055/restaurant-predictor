import { useEffect, useState }
from "react";

import Layout
from "../components/Layout";

import IngredientForm
from "../components/IngredientForm";

import IngredientTable
from "../components/IngredientTable";

import {
    getIngredients,
    createIngredient,
    deleteIngredient,
}
from "../services/ingredientService";

function Inventory() {

    const [ingredients,
        setIngredients] =
        useState([]);

    useEffect(() => {

        loadIngredients();

    }, []);

    async function loadIngredients() {

        const data =
            await getIngredients();

        setIngredients(data);
    }

    async function handleCreate(
        ingredient
    ) {

        await createIngredient(
            ingredient
        );

        loadIngredients();
    }

    async function handleDelete(
        id
    ) {

        await deleteIngredient(id);

        loadIngredients();
    }

    return (

        <Layout>

            <h1
                className="
                    text-4xl
                    font-bold
                    mb-6
                "
            >
                Inventory
            </h1>

            <IngredientForm
                onSubmit={
                    handleCreate
                }
            />

            <IngredientTable
                ingredients={
                    ingredients
                }
                onDelete={
                    handleDelete
                }
            />

        </Layout>

    );
}

export default Inventory;