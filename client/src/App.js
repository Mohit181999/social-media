import React,{Fragment, useEffect} from 'react';
import Landing from "./components/layout/Landing";
import NavBar from './components/layout/navBar'; 
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './App.css';
//redux
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alerts";
import setAuthToken from './utils/setAuthToken';
import { loaduser } from './action/auth';
import Dashboard from "./components/Dashboard/Dashboard";
import Profiles from "./profiles/Profiles"
import Profile from "./profile/Profile"
import Privateroute from "./components/routing/Privateroutiing";
import Createprofile from "./profileform/Createprofile"
import Editprofile from "./profileform/Editprofile"
import Post from "./components/posts/post";
import Posti from "./components/post/posti";
import Editpost from './components/posts/Editpost';
import following from './components/Dashboard/following';
import follower from './components/Dashboard/follower';


if(localStorage.token){
   setAuthToken(localStorage.token);
}
 
const App = ()=> {
  useEffect(() => {     
    store.dispatch(loaduser());
  }, []);
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
       <NavBar/> 
      <Route exact path="/" component={Landing} /> 
      <section className="container">
        <Alert /> 
      <Switch >
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/profile/:id" component={Profile} />
      <Privateroute exact path="/dashboard" component={Dashboard} />
      <Privateroute exact path="/following" component={following} />
      <Privateroute exact path="/followers" component={follower} />
      <Privateroute exact path="/create-profile" component={Createprofile} />
      <Privateroute exact path="/edit-profile" component={Editprofile} />
      <Privateroute exact path="/edit-post/:id" component={Editpost} />
      <Privateroute exact path="/posts" component={Post} />
      <Privateroute exact path="/post/:id" component={Posti} />
       
      </Switch> 
      </section>         
    </Fragment>
    </Router>
    </Provider>
  )
};

export default App;
