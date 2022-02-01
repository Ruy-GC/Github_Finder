import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/about';
import axios from 'axios';
import GithubState from './context/github/GithubState';

const App =() =>{
  const [repos,setRepos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null);

  //ver repositorios
  const getUserRepos = async username =>{
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data);
    setLoading(false);
  };

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
            <Route exact path = '/user/:login' render = {props => (
              <User 
                {...props} 
                getUserRepos = {getUserRepos} 
                repos = {repos}
                />
            )} />
          </Switch>
          
        </div>
      </div>
      </Router>
    </GithubState>
  );
}

export default App;
