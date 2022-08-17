import http from 'k6/http'

const BASE_URL = 'http://127.0.0.1:8000'

export function home_page() {
    return http.get(`${BASE_URL}/`)
}

export function add_user(username, password) {
    const url = `${BASE_URL}/user/add`

    const payload = JSON.stringify({
        username: username,
        password: password
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return http.post(url, payload, params)
}

export function update_user(position, username, password) {
    const url = `${BASE_URL}/user/update/${position}`

    const payload = JSON.stringify({
        username: username,
        password: password
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return http.put(url, payload, params)
}

export function delete_user(position) {
    const url = `${BASE_URL}/user/delete/${position}`

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return http.del(url, null, params)
}