import React, {useReducer} from "react";
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

//se puede utilizar en cualquier componente al importar context
//reemplazando el tener que pasar la información como propiedades
const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer,initialState);

    //set Alert
    const setAlert = (msg,type) =>{
        dispatch({
            type: SET_ALERT,
            payload: {msg,type}
        })

        setTimeout(() => dispatch({type:REMOVE_ALERT}),5000);
    };
    
    return <AlertContext.Provider
        //aquí se incluyen las variables de estado y funciones para poder ser utilizadas en otros componentes
        value = {{
            alert: state,
            setAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;