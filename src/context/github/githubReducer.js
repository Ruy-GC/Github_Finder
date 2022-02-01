import {
    SEARCH_USERS,
    SET_ALERT,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from '../types';


//un reducer es una función que toma una acción y el estado previo para
//retornar un nuevo estado, su trabajo es devolver un estado basado en la acción recibida
export default (state,action) =>{
    switch(action.type){
        case SET_LOADING:
            return {
                ...state, //copia el estado actual
                loading: true
            }
        
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload, //obtiene la carga de usuarios de la acción
                loading: false
            }

        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading:false
            }
        
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading:false
            }
            
        default:
            return state;
    }
}