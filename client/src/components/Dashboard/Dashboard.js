import React,{Fragment ,useEffect} from "react";
import {Link} from "react-router-dom";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile, deleteAcc} from "../../action/profile"
import Bio from "./bio"
import Dashboardactions from "./Dahboaractions"
import Spinner from "../layout/spinner"
import Userposts from "./Userposts";
 

const Dashboard = ( {getCurrentProfile,deleteAcc,
    auth: { user },
    profile: { profile ,loading}})=>{
      useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    return( loading && profile ===null ?<Spinner />:(
        <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile === null ? (        
        <Fragment>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">           
          Create Profile     
          </Link>    
      </Fragment>
      ) : (         
      <Fragment>
      <Dashboardactions profile={profile}/>
      <br></br>
      <hr></hr>
      <Bio bio={profile.bio} followers={profile.followers} following={profile.following}/>
      <br></br>
      <hr></hr>
      <br></br>
      <Userposts />
      <div className="my-2">
        <button onClick={()=>deleteAcc()} className="btn btn-danger" >Delete My Account</button>
      </div>
   </Fragment>
      )}
    </Fragment>    
    )
    )
}

Dashboard.propsTypes ={
    getCurrentProfile:PropsTypes.func.isRequired,
    auth:PropsTypes.object.isRequired,
    deleteAcc:PropsTypes.func.isRequired,
    profile:PropsTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth:state.auth,
    profile:state.profile
});
export default connect(mapStateToProps,{getCurrentProfile,deleteAcc})(Dashboard);