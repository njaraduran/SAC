import { 
    EXPEDIENTES_LIST_REQUEST,
    EXPEDIENTES_LIST_SUCCESS,
    EXPEDIENTES_LIST_FAIL,
    EXPEDIENTES_DETAILS_REQUEST,
    EXPEDIENTES_DETAILS_SUCCESS,
    EXPEDIENTES_DETAILS_FAIL
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

