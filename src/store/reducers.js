import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import usersReducer from './usersReducer'


export default (history) => combineReducers({
    router: connectRouter(history),
    usersReducer
})

