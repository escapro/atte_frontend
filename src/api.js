import axios from 'axios';
import moment from 'moment'

export default class Adapter {
    constructor() {
        this.backendHost = '127.0.0.1:8000'
        // this.backendHost = '626677-cw59614.tmweb.ru'
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

    client(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'clients/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
            case 'put':
                return axios.put(this.getBackendUrl() + 'client/update', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
        }
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

    shiftTypes(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'shift_types/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
            case 'create':
                return axios.post(this.getBackendUrl() + 'shift_type/new/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
        }
    }

    getCashboxes() {
        return axios.get(this.getBackendUrl() + 'cashboxes/', this.getApiHeaders())
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    employee(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'employees/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
            case 'create':
                return axios.post(this.getBackendUrl() + 'employee/new/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
        }
    }

    expenseCategories(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'expense_categories/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
            case 'post':
                return axios.post(this.getBackendUrl() + 'expense_categorie/new/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    })
        }
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

    getAccounting(params) {
        let config = {
            headers: this.getApiHeaders().headers,
            params: {
                from_date: moment(new Date().setDate(1)).format('YYYY-MM-DD'),
                ...params
            },
        }

        return axios.get(this.getBackendUrl() + 'accounting/', config)
            .then(response => {
                return { 'data': response.data, 'status': response.status }
            })
    }

    bonuses(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'bonuses/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
            case 'create':
                return axios.post(this.getBackendUrl() + 'bonuse/new/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
        }
    }

    additionalExpense(action, data) {
        switch (action) {
            case 'post':
                return axios.post(this.getBackendUrl() + 'additional_expense/new/', data, this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
        }
    }

    additionalExpenseCategory(action, data) {
        switch (action) {
            case 'get':
                return axios.get(this.getBackendUrl() + 'additional_expense_categories/', this.getApiHeaders())
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
        }
    }

    payrolls(action, data, params) {
        switch (action) {
            case 'get':
                let config = {
                    headers: this.getApiHeaders().headers,
                    params: {
                        date_month: moment(new Date().setDate(1)).format('MM'),
                        date_year: moment(new Date().setDate(1)).format('YYYY'),
                        ...params
                    },
                }
                return axios.get(this.getBackendUrl() + 'payrolls/', config)
                    .then(response => {
                        return { 'data': response.data, 'status': response.status }
                    });
        }
    }
}