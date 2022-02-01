import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/about';

//usando githubstate logramos que nuestro app.js no realice requests a la api, dejando todo el rabajo a context
import GithubState from './context/github/GithubState';

const App =() =>{
  const [alert,setAlert] = useState(null);

  //set Alert
  const showAlert = (msg,type) =>{
    setAlert({msg,type});
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
      <div className="App">
        <Navbar tittle = 'Github Finder' icon = 'fab fa-github' />  
        <div className = 'container'>
          <Alert alert = {alert}/>
          <Switch>
            <Route exact path ='/' render = {props => (
              <Fragment>
                <Search 
                  setAlert = {showAlert}/>
                  <Users/>
              </Fragment>
            )}/>
            <Route exact path = '/about' component = {About}/>
            <Route exact path = '/user/:login' component = {User} />
          </Switch>
          
        </div>
      </div>
      </Router>
    </GithubState>
  );
}

export default App;
