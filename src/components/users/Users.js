import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

const Users = () => {
    const githubContext = useContext(GithubContext);

    const {loading,users} = githubContext;

    if(loading){
        return <Spinner/>
    }else{   
        //map es un metodo de ordén de arreglos y loopea en este, user es el iterador
        //al hacer un arreglo se necesita una key unica por elemento
        return (
            <div style ={userStyle}>
                {users.map(user => (                   
                    <UserItem key ={user.id} user = {user} />
                ))}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap : '1rem'

}

export default Users
