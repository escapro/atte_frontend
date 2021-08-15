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
        return axios.get(this.getBackendUrl() + 'me/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    getClient() {
        return axios.get(this.getBackendUrl() + 'clients/', this.getApiHeaders())
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


    getShiftTypes() {
        return axios.get(this.getBackendUrl() + 'shift_types/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    getEmployees() {
        return axios.get(this.getBackendUrl() + 'employees/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    getExpenseCategories() {
        return axios.get(this.getBackendUrl() + 'expense_categories/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    expenses(action, data) {

        switch (action) {
            case 'list':
                return axios.get(this.getBackendUrl() + 'expenses/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
            case 'create':
                return axios.post(this.getBackendUrl() + 'expenses/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
        }
    }

    closeShift(data) {
        return axios.post(this.getBackendUrl() + 'close_shift/', data, this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }
}