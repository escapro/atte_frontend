import axios from 'axios';

export class Adapter {
    constructor() {
        this.backendHost = '127.0.0.1:8000'
        this.protocol = 'http'
        this.subdomain = ''
        this.token = ''
        this.user = ''
    }

    getBackendUrl = () => `${this.protocol}://${this.subdomain}.${this.backendHost}/api/`
    getApiHeaders = () => { return { headers: { 'Authorization': 'Token ' + this.token } } }

    getToken(username, password) {
        return axios.post(this.getBackendUrl() + 'auth/token', { 'username': username, 'password': password })
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    getProfile() {
        return axios.get(this.getBackendUrl() + 'profile/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    getClient() {
        return axios.get(this.getBackendUrl() + 'client/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    logout() {
        return axios.get(this.getBackendUrl() + 'auth/logout', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }


    getShifts() {
        return axios.get(this.getBackendUrl() + 'shift/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    getEmployees() {
        return axios.get(this.getBackendUrl() + 'employee/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }
}