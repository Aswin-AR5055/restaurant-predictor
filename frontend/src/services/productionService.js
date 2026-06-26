import api from "../api/axios";

export async function getProductions() {
    const response = await api.get("productions/");
    return response.data;
}

export async function createProduction(production) {
    const response = await api.post("productions/", production);
    return response.data;
}

export async function deleteProduction(id) {
    await api.delete(`productions/${id}/`);
}
