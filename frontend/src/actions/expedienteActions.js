import axios from 'axios'
import { 
    EXPEDIENTES_LIST_REQUEST,
    EXPEDIENTES_LIST_SUCCESS,
    EXPEDIENTES_LIST_FAIL,

    EXPEDIENTES_DETAILS_REQUEST,
    EXPEDIENTES_DETAILS_SUCCESS,
    EXPEDIENTES_DETAILS_FAIL,

} from '../constants/expedienteConstants';

export const listExpedientes = () => async (dispatch)=>{
    try {
        dispatch({type:EXPEDIENTES_LIST_REQUEST})

        const {data}  = await axios.get('/api/expedientes/')

        dispatch({
            type: EXPEDIENTES_LIST_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:EXPEDIENTES_LIST_FAIL,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message,
        })
    }
}

export const listExpedienteDetails = (id) => async (dispatch)=>{
    try {
        dispatch({type:EXPEDIENTES_DETAILS_REQUEST})

        const {data}  = await axios.get(`/api/expedientes/${id}`)

        dispatch({
            type: EXPEDIENTES_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:EXPEDIENTES_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message,
        })
    }
}