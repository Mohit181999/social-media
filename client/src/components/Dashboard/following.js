import React,{Fragment ,useEffect} from "react";
import {Link} from "react-router-dom";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../action/profile"
import {unfollowUser} from '../../action/profile' 
import Followingitem from "./followingitem";
 

const Dashboard = ( {getCurrentProfile,unfollowUser,
    profile: { profile ,loading}})=>{
      useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    return( 
       <div>
           <p className="lead">
         You are following these users
      </p>
      {profile.following.lenth>0 &&  <div className="profiles">
            <Followingitem following={profile.following}/>
            </div>}
     
       </div>
    )
}

Dashboard.propsTypes ={
    getCurrentProfile:PropsTypes.func.isRequired,
  
    profile:PropsTypes.object.isRequired
}
const mapStateToProps = (state) =>({    
    profile:state.profile
});
export default connect(mapStateToProps,{getCurrentProfile,unfollowUser})(Dashboard);