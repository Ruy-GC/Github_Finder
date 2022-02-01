import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext';

const Search = ({setAlert}) => {
    //inicializamos context para utilizar las propiedades en vez de utilizar props
    const githubContext = useContext(GithubContext)

    const [text, setText] = useState('');
    

    const onChange = (e) => setText(e.target.value)
    //usando esto [] evitas tener que hacer un onChange por cada input ya que toma el nombre del input y altera lo que se necesite

    const onSubmit = (e) =>{
        e.preventDefault();
        if(text === ''){
            setAlert('Please enter something','light');
        }else{
            githubContext.searchUsers(text);
            setText('');
        }

    }

    return (
        <div>
            <form className= "form" onSubmit = {onSubmit}>
                <input type= "text" name="text" placeholder="Search Users..." value ={text} onChange= {onChange}/>
                <input type="submit" value= "Search" className = "btn btn-dark btn-block"/>
            </form>

            {githubContext.users.length > 0 &&(
                <button className = "btn btn-light btn-block" onClick = {githubContext.clearUsers}>
                    Clear
                </button>
            )}
                
        </div>
    )
}

Search.propTypes={
    setAlert: PropTypes.func.isRequired
}

export default Search
