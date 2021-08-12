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
    getApiHeaders = () => {return {headers: {'Authorization': 'Token ' + this.token}}}

    getToken(username, password) {
        return axios.post(this.getBackendUrl() + 'auth/token',  {'username': username, 'password': password})
            .then(response => {
                return {'data': response.data, 'status': response.status}
            })
    }

    getProfile() {
        return axios.get(this.getBackendUrl() + 'profile/', this.getApiHeaders())
            .then(response => {
                return {'data': response.data, 'status': response.status}
            })
    }  

    getClient() {
        return axios.get(this.getBackendUrl() + 'client/', this.getApiHeaders())
            .then(response => {
                return {'data': response.data, 'status': response.status}
            })
    }  

    getShifts() {
        return axios.get(this.getBackendUrl() + 'shift/', this.getApiHeaders())
            .then(response => {
                return {'data': response.data, 'status': response.status}
            })
    }  
}

export const BACKEND_URL = 'http://127.0.0.1:8000/api/'

const APIinstance = axios.create({
    baseURL: BACKEND_URL,
})

APIinstance.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

export const tokenAPI = {
    getTokens(username, password) {
        return axios.post(BACKEND_URL + 'auth/token',  {'username': username, 'password': password})
            .then(response => {
                return {'data': response.data, 'status': response.status}
            })
    }
};

export const profileAPI = {
    getProfile(with_token='') {

        if(with_token == '') {
            return APIinstance.get('profile/')
                .then(response => {
                    return {'data': response.data, 'status': response.status}
                })
        }else {
            return axios.get(BACKEND_URL + 'profile/', {headers: {'Authorization': 'Token ' + with_token}})
                .then(response => {
                    return {'data': response.data, 'status': response.status}
                })
            }
    },

    logout(token) {
        return axios.post(BACKEND_URL + 'auth/logout', {}, {headers: {'Authorization': 'Token ' + token}})
            .then(response => {
                return {'data': response.data, 'status': response.status}
            })
    }
};