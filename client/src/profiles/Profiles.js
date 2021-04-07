import React, { useEffect } from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../components/layout/spinner"
import {getAllProfiles} from "../action/profile";
import Profilesitem from "./Profilesitem";

const Profiles = ({getAllProfiles,profile:{profiles,loading}})=>{
    useEffect(()=>{
        getAllProfiles();
    },[getAllProfiles])
    return(<div>
        {loading ? <Spinner/> :(<div>
            <h1 className="large text-primary">Develpors</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop">Browse and explore</i>
            </p>
            <div className="profiles">
            {(profiles.map(profile=><Profilesitem key={profile._id} profile={profile} />))
            }</div>
        </div>)}
        </div>
    )
}



Profiles.propsTypes ={
    getAllProfiles:PropsTypes.func.isRequired,
    profile:PropsTypes.object.isRequired
}
const mapStateToProps =state=> ({
    profile:state.profile
});

export default connect(mapStateToProps,{getAllProfiles})(Profiles);