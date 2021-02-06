import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/about';
import axios from 'axios';

class App extends Component{
  state ={
    users:[],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  //busca usuario
  searchUsers = async text =>{
    this.setState({loading:true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({users: res.data.items, loading: false});
  };  
  //obtener un solo usuario
  getUser = async username =>{
    this.setState({loading:true});

    const res = await axios.get(`https://api.github.com/users/${username}?client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({user: res.data, loading: false});
  };

  //ver repositorios
  getUserRepos = async username =>{
    this.setState({loading:true});

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id= ${process.env.React_APP_GITHUB_CLIENT_ID} 
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({repos: res.data, loading: false});
  };

  //limpiar pantalla
  clearUsers = () => this.setState({users:[], loading: false});

  //set Alert
  setAlert = (msg,type) =>{
    this.setState({alert:{msg,type}});
    setTimeout(() => this.setState({alert:null}), 3000);
  };

  render(){
    
    const {users,loading,user,repos} = this.state;
    
    return (
      <Router>
      <div className="App">
        <Navbar tittle = 'Github Finder' icon = 'fab fa-github' />  
        <div className = 'container'>
          <Alert alert = {this.state.alert}/>
          <Switch>
            <Route exact path ='/' render = {props => (
              <Fragment>
                <Search 
                  searchUsers= {this.searchUsers}
                  clearUsers = {this.clearUsers} 
                  showClear = {users.length > 0 ? true:false}
                  setAlert = {this.setAlert}/>
                  <Users loading = {loading} users = {users} />
              </Fragment>
            )}/>
            <Route exact path = '/about' component = {About}/>
            <Route exact path = '/user/:login' render = {props => (
              <User 
                {...props} 
                getUser = {this.getUser} 
                getUserRepos = {this.getUserRepos} 
                user = {user} 
                repos = {repos}
                loading = {loading}/>
            )} />
          </Switch>
          
        </div>
      </div>
      </Router>
     
    );

  }
  
}

export default App;
