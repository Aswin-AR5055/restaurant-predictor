import api from "../api/axios";

export async function getMenuItems() {
    const response = await api.get(
        "menu-items/"
    );

    return response.data;
}