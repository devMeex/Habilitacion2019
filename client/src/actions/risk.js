import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_RISKS,
    ERROR_GET_RISK,
    INSERT_RISK,
    ERROR_RISK,
    DELETE_RISKS,
    ERROR_DELETE_RISK
} from './types';

export const getAllRisk = () => async dispatch => {

    try {
        
        const res = await axios.get('api/risk/getAll');
        dispatch({
            type: GET_RISKS,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: ERROR_GET_RISK,
            payload: {msg: err.response.statusText, status: err.repsonse.status}
        })
    }

}

//Register risk
export const registerRisk = ({ name, description, history}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, description});

    try {

        const res = await axios.post('/api/risk', body, config);

        dispatch({
            type: INSERT_RISK,
            payload: res.data
        });

        dispatch(setAlert('El riesgo fue creado correctamente', 'success'));

        history.push('/admin-risk');
        
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ERROR_RISK
        })
    }

}

//Borra el riesgo según el id
export const deleteRiskById = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({id});

    try {

        const res = await axios.post('/api/risk/delete', body, config);

        dispatch({
            type: DELETE_RISKS,
            payload: res.data
        });

        dispatch(getAllRisk());

        dispatch(setAlert('El riesgo fue eliminado correctamente', 'success'));
        
        
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ERROR_DELETE_RISK
        })
        
    }

}



