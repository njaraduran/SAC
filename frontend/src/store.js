import { createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { expedienteListReducers,
    expedienteDetailsReducers ,
    expedienteDeleteReducers,
    expedienteCreateReducers,
    expedienteUpdateReducers
} from './reducers/expedienteReducer'
import { userLoginReducers,
    userRegisterReducer,
    userDetailsReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducer'



const reducer = combineReducers({
    expedienteList: expedienteListReducers,    
    expedienteDetails: expedienteDetailsReducers,
    expedienteDelete: expedienteDeleteReducers,
    expedienteCreate: expedienteCreateReducers,
    expedienteUpdate: expedienteUpdateReducers,

    userLogin:userLoginReducers,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin:{userInfo:userInfoFromStorage}

}
const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store