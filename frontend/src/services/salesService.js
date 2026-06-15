import api from "../api/axios";

export async function getSales() {
    const response = await api.get(
        "sales/"
    );

    return response.data;
}

export async function createSale(
    sale
) {
    const response = await api.post(
        "sales/",
        sale
    );

    return response.data;
}