import React from"react";
import PropsTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {followUser,unfollowUser} from '../action/profile'
const Profilesitem = ({followUser,unfollowUser,
    profile:{
        user:{_id,name,avatar},
         bio,
          
                 
    }})=>{
    return(
    <div className="profile bg-light">
        <img src={avatar} alt="" className="round-img"></img>
        <div>
            <h2>{name}</h2>        
    <p className="my-1" >{bio && <span>{bio}</span>}</p>
     
    <Link to={`profile/${_id}`} className="btn btn-primary">View Profile</Link>
    <button onClick={()=>{
        followUser(_id)}} type="button" className="btn btn-dark">
              FOLLOW  
            </button>
            <button type="button" className="btn btn-dark" onClick={(e)=>unfollowUser(_id)}>
            UNFOLLOW
              </button>
         
     

        

    </div>
    </div>)
}
Profilesitem.propsTypes={
    followUser:PropsTypes.func.isRequired,
    unfollowUser:PropsTypes.func.isRequired,
    profile:PropsTypes.object.isRequired
}



 

export default connect(null,{followUser,unfollowUser})(Profilesitem);