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

    checkShift() {
        return axios.get(this.getBackendUrl() + 'shifts/check/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    openShift(data) {
        return axios.post(this.getBackendUrl() + 'shifts/open/', data, this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    activeShift(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'shifts/active/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
            case 'updateAction':
                return axios.put(this.getBackendUrl() + 'shifts/active/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
            case 'close':
                return axios.post(this.getBackendUrl() + 'shifts/active/close', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
        }
    }

    closeWorkingDay(data) {
        return axios.post(this.getBackendUrl() + 'working_day/active/close', data, this.getApiHeaders())
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

    getCashboxes() {
        return axios.get(this.getBackendUrl() + 'cashboxes/', this.getApiHeaders())
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

    shiftExpenses(action, data) {
        switch (action) {
            case 'list':
                return axios.get(this.getBackendUrl() + 'shift_expenses/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
            case 'create':
                return axios.post(this.getBackendUrl() + 'shift_expenses/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
        }
    }
}