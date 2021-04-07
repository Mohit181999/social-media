import React from 'react';
import {unfollowUser} from '../../action/profile'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropsTypes from "prop-types";

const Followingitem=({following,unfollowUser})=>{
    return(
        <div>
             <div className="profile bg-light">
                <img src={following.avatar} alt="" className="round-img"></img>
                <div>
                    <h2>{following.name}</h2>        
            
             
            <Link to={`profile/${following.user}`} className="btn btn-primary">View Profile</Link>
            
                    <button type="button" className="btn btn-dark" onClick={(e)=>{e.preventDefault();
                      unfollowUser(following.user)
                    }}>
                    UNFOLLOW
                      </button>
                 
             
        
                
        
            </div>
            </div>
        </div>
    )
}

Followingitem.propsTypes = {
     
    following:PropsTypes.object.isRequired,
    unfollowUser:PropsTypes.func.isRequired,
}


export default connect({unfollowUser})(Followingitem);