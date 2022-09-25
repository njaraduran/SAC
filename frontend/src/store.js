import { createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { expedienteListReducers,expedienteDetailsReducers } from './reducers/expedienteReducer'



const reducer = combineReducers({
    expedienteList: expedienteListReducers,    
    expedienteDetails: expedienteDetailsReducers,
})
const initialState = {}
const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store