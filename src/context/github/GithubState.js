import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_ALERT,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from '../types';

//se puede utilizar en cualquier componente al importar context
//reemplazando el tener que pasar la información como propiedades
const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer,initialState);

    //Search Users
    const searchUsers = async text =>{
        setLoading();
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
        &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        //envia datos al reducer, este alterará los valores del estado de los demás componentes
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    };

    //Get User

    //Get Repos

    //Clear Users

    //Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return <GithubContext.Provider
        value = {{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;