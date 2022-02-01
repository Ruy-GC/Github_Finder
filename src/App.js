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
  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({});
  const [repos,setRepos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null);

  //obtener un solo usuario
  const getUser = async username =>{
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(res.data);
    setLoading(false);
  };

  //ver repositorios
  const getUserRepos = async username =>{
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data);
    setLoading(false);
  };

  //limpiar pantalla
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }
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
                  clearUsers = {clearUsers} 
                  showClear = {users.length > 0 ? true:false}
                  setAlert = {showAlert}/>
                  <Users loading = {loading} users = {users} />
              </Fragment>
            )}/>
            <Route exact path = '/about' component = {About}/>
            <Route exact path = '/user/:login' render = {props => (
              <User 
                {...props} 
                getUser = {getUser} 
                getUserRepos = {getUserRepos} 
                user = {user} 
                repos = {repos}
                loading = {loading}/>
            )} />
          </Switch>
          
        </div>
      </div>
      </Router>
    </GithubState>
  );
}

export default App;
