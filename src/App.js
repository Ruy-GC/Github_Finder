import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import About from './components/pages/about';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

//usando githubstate logramos que nuestro app.js no realice requests a la api, dejando todo el rabajo a context
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App =() =>{
  return (
    <GithubState>
      <AlertState>
        <Router>
        <div className="App">
          <Navbar tittle = 'Github Finder' icon = 'fab fa-github' />  
          <div className = 'container'>
            <Alert alert = {alert}/>
            <Switch>
              <Route exact path ='/' component={Home}/>
              <Route exact path = '/about' component = {About}/>
              <Route exact path = '/user/:login' component = {User} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
