import {profileAPI} from '../adapters/api'


export async function authCheck(token='', adapter) {
    
    let result = {data: null, success: false}

    if(localStorage.getItem('token')) {

        await adapter.getProfile()
            .then(response => {
                result = {data: response.data, success: true}
            })
            .catch(() => {
                result = {data: '', success: false}
            })

        // await profileAPI.getProfile(token)
        // .then(response => {
        //     result = {data: response.data, success: true}
        // })
        // .catch(() => {
        //     result = {data: '', success: false}
        // })
    }

    return result
}