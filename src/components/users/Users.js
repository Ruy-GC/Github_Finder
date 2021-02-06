import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

const Users = ({users,loading}) => {

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
Users.prototype = {
    users:PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap : '1rem'

}

export default Users
