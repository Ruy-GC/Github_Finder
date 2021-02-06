import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//toma los datos desde el usurio que esté en la lista del archivo Users.js

 const UserItem = ({user: {login,avatar_url,html_url}}) => { 
    //muestra el usuario
    return (
        <div className = "card text-center">
            <img 
                src = {avatar_url} 
                alt = "" 
                className = "round-img" 
                style ={{ width: '60px'}}
                />
            <h3>{login}</h3>

            <div>
                <Link to = {`/user/${login}`} className = "btn btn-dark btn-sm my-1">More</Link>
           </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}
export default UserItem;
