import api from "../api/axios";

export async function getExpenses() {
    const response = await api.get("expenses/");
    return response.data;
}

export async function createExpense(expense) {
    const response = await api.post("expenses/", expense);
    return response.data;
}

export async function deleteExpense(id) {
    await api.delete(`expenses/${id}/`);
}
