import React from "react";
import PropsTypes from "prop-types";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const Privateroute = ({component:Component,auth:{isAuthenticated,loading},...rest})=>{
    return(
         <Route 
         {...rest}
         render={props=>
            !isAuthenticated && !loading?(
                <Redirect to="/login" />
            ):(
                <Component {...props} />
            )

         } 
         />
    )
}

Privateroute.propsTypes ={
    auth:PropsTypes.object.isRequired
}
const mapStateToProps =(state)=>({
    auth:state.auth
});
export default connect(mapStateToProps)(Privateroute);