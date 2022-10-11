import { 
    EXPEDIENTES_LIST_REQUEST,
    EXPEDIENTES_LIST_SUCCESS,
    EXPEDIENTES_LIST_FAIL,

    EXPEDIENTES_DETAILS_REQUEST,
    EXPEDIENTES_DETAILS_SUCCESS,
    EXPEDIENTES_DETAILS_FAIL,
    
    EXPEDIENTES_DELETE_REQUEST,
    EXPEDIENTES_DELETE_SUCCESS,
    EXPEDIENTES_DELETE_FAIL,
    
    EXPEDIENTES_CREATE_REQUEST,
    EXPEDIENTES_CREATE_SUCCESS,
    EXPEDIENTES_CREATE_FAIL,
    EXPEDIENTES_CREATE_RESET,
    
    EXPEDIENTES_UPDATE_REQUEST,
    EXPEDIENTES_UPDATE_SUCCESS,
    EXPEDIENTES_UPDATE_FAIL,
    EXPEDIENTES_UPDATE_RESET
 } from '../constants/expedienteConstants'

export const expedienteListReducers = (state={expedientes:[]},action)=>{
    switch(action.type){
        case EXPEDIENTES_LIST_REQUEST:
            return {loading:true,expedientes:[]}
        case EXPEDIENTES_LIST_SUCCESS:
            return {loading:false,expedientes:action.payload}    
        case EXPEDIENTES_LIST_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state

        }
}

export const expedienteDetailsReducers = (state={expediente:{reviews:[]}},action)=>{
    switch(action.type){
        case EXPEDIENTES_DETAILS_REQUEST:
            return {loading:true,...state}
        case EXPEDIENTES_DETAILS_SUCCESS:
            return {loading:false,expediente:action.payload}    
        case EXPEDIENTES_DETAILS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state

        }
}

export const expedienteDeleteReducers = (state={},action)=>{
    switch(action.type){
        case EXPEDIENTES_DELETE_REQUEST:
            return {loading:true}
        case EXPEDIENTES_DELETE_SUCCESS:
            return {loading:false,success:true}    
        case EXPEDIENTES_DELETE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state

        }
}

export const expedienteCreateReducers = (state={},action)=>{
    switch(action.type){
        case EXPEDIENTES_CREATE_REQUEST:
            return {loading:true}
        case EXPEDIENTES_CREATE_SUCCESS:
            return {loading:false,success:true,expediente:action.payload}    
        case EXPEDIENTES_CREATE_FAIL:
            return {loading:false,error:action.payload} 
        case EXPEDIENTES_CREATE_RESET:
                return {}
        default:
            return state

        }
}

export const expedienteUpdateReducers = (state={expediente:{}},action)=>{
    switch(action.type){
        case EXPEDIENTES_UPDATE_REQUEST:
            return {loading:true}
        case EXPEDIENTES_UPDATE_SUCCESS:
            return {loading:false,success:true,expediente:action.payload}    
        case EXPEDIENTES_UPDATE_FAIL:
            return {loading:false,error:action.payload} 
        case EXPEDIENTES_UPDATE_RESET:
                return {expediente:{}}
        default:
            return state

        }
}




