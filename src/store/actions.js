import {
   ACTION_CHANGE_TOKEN,
   ACTION_CHANGE_USERDATA,
   ACTION_CHANGE_CLIENT, 
   ACTION_SET_ADAPTER
} from './action_constans'

export const changeToken = (newToken) => {
   return {
      type: ACTION_CHANGE_TOKEN,
      payload: newToken
   }
}

export const changeUserdata = (userdata) => {
   return {
      type: ACTION_CHANGE_USERDATA,
      payload: userdata
   }
}

export const changeClient = (client) => {
   return {
      type: ACTION_CHANGE_CLIENT,
      payload: client
   }
}

export const setAdapter = (adapter) => {
   return {
      type: ACTION_SET_ADAPTER,
      payload: adapter
   }
}