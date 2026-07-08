import api from "../api/axios";

export async function login(username, password) {

    const response = await api.post("token/", {
        username,
        password,
    });

    console.log(response.data);

    const { access, refresh } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    console.log(
        "Stored:",
        localStorage.getItem("access")
    );

    return response.data;
}

export async function register(username, password) {
    const response = await api.post("register/", { username, password });
    return response.data;
}