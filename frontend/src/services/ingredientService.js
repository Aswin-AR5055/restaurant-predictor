import api from "../api/axios";

export async function getIngredients() {
    const response = await api.get(
        "ingredients/"
    );

    return response.data;
}

export async function createIngredient(
    ingredient
) {
    const response = await api.post(
        "ingredients/",
        ingredient
    );

    return response.data;
}

export async function deleteIngredient(
    id
) {
    await api.delete(
        `ingredients/${id}/`
    );
}