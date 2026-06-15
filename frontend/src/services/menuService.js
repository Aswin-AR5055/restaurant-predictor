import api from "../api/axios";

export async function getMenuItems() {

    const response =
        await api.get(
            "menu-items/"
        );

    return response.data;
}

export async function createMenuItem(
    item
) {

    const response =
        await api.post(
            "menu-items/",
            item
        );

    return response.data;
}

export async function deleteMenuItem(
    id
) {

    await api.delete(
        `menu-items/${id}/`
    );
}