import React from 'react'
import PropTyes from 'prop-types'
import {Link} from 'react-router-dom';

//functional component, reduce y limpia el codigo, no necesita render, funciona igual
const Navbar = ({icon, tittle}) => {
    
    //clase que genera una barra de navegación a la que le puedo ingresar propiedades que yo elija 

        return (
            <nav className = 'navbar bg-primary'>
                <h1>
                    <i className={icon}/>  {tittle}
                </h1>
                <ul>
                    <li>
                        <Link to ='/'> Home</Link>
                    </li>
                    <li>
                        <Link to ='/about'> About</Link>
                    </li>
                </ul>
            </nav>
        )
}

//propiedades predeterminadas
Navbar.defaultProps = {
    tittle : 'Github Finder',
    icon: 'fab fa-github'
};

//tipo de dato por propiedad, si no se cumple muestra un error pero compila de todas formas
Navbar.propTyes = {
    tittle: PropTyes.string.isRequired,
    icon : PropTyes.string.isRequired
};

export default Navbar
