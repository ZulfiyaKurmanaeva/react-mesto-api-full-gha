class Api {
    constructor(config) {
        this._url = config.url;       
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _request(url, options) {
        return fetch(url, options).then(this._getResponse)
    }

    createCard(data) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    deleteCard(id) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    changeLikeCardStatus(id, isLiked) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    putLike(id) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    deleteLike(id) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    setUserInfo(data) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    setUserAvatar(data) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }
}

const api = new Api({
    url: 'https://unos.nomoredomains.rocks',    
});

export default api;