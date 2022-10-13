import axios from 'axios'
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

    EXPEDIENTES_UPDATE_REQUEST,
    EXPEDIENTES_UPDATE_SUCCESS,
    EXPEDIENTES_UPDATE_FAIL,

    EXPEDIENTES_CREATE_ENTRADA_REQUEST,
    EXPEDIENTES_CREATE_ENTRADA_SUCCESS,
    EXPEDIENTES_CREATE_ENTRADA_FAIL,


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
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
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
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message,
        })
    }
}

export const deleteExpediente = (id) => async (dispatch,getState)=>{
    try {
        dispatch({
            type:EXPEDIENTES_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data}  = await axios.delete(`/api/expedientes/delete/${id}`,config)

        dispatch({
            type: EXPEDIENTES_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type:EXPEDIENTES_DELETE_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message,
        })
    }
}
export const createExpediente = () => async (dispatch,getState)=>{
    try {
        dispatch({
            type:EXPEDIENTES_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data}  = await axios.post(
            `/api/expedientes/create/`,
            {},
            config
         )

        dispatch({
            type: EXPEDIENTES_CREATE_SUCCESS,
            payload:data,
        })

    } catch (error) {
        dispatch({
            type:EXPEDIENTES_CREATE_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message,
        })
    }
}

export const updateExpediente = (expediente) => async (dispatch,getState)=>{
    try {
        dispatch({
            type:EXPEDIENTES_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data}  = await axios.put(
            `/api/expedientes/update/${expediente._id.id}/`,
            expediente,
            config
         )

        dispatch({
            type: EXPEDIENTES_DETAILS_SUCCESS,
            payload:data,
        })
        dispatch({
            type: EXPEDIENTES_UPDATE_SUCCESS,
            payload:data,
        })


    } catch (error) {
        dispatch({
            type:EXPEDIENTES_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message,
        })
    }
}

export const createExpedienteEntrada = (entrada,expedienteId) => async (dispatch,getState)=>{
    try {
        dispatch({
            type:EXPEDIENTES_CREATE_ENTRADA_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data}  = await axios.post(
            `/api/expedientes/${expedienteId}/entradas/`,
            entrada,
            config
         )

        dispatch({
            type: EXPEDIENTES_CREATE_ENTRADA_SUCCESS,
            payload:data,
        })


    } catch (error) {
        dispatch({
            type:EXPEDIENTES_CREATE_ENTRADA_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message,
        })
    }
}
