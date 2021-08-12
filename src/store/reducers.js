import {
    ACTION_CHANGE_TOKEN,
    ACTION_CHANGE_USERDATA,
    ACTION_CHANGE_CLIENT,
    ACTION_SET_ADAPTER 
} from './action_constans'

import {initialState} from './initial_state'

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_CHANGE_TOKEN:
        return {...state, token: action.payload}  
      case ACTION_CHANGE_USERDATA:
          return {...state, user: action.payload}  
      case ACTION_CHANGE_CLIENT:
          return {...state, client: action.payload}  
      case ACTION_SET_ADAPTER:
          return {...state, adapter: action.payload}  
        break;
    }
  
    return state
  }