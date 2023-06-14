export const baseUrl = "https://auth.nomoreparties.co";

export function register(password, email) {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then(checkResponse);
};

export function authorize(password, email) {
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then(checkResponse);
};

export function getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(checkResponse);
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}
