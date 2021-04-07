import React,{useState,useEffect} from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {createProfile} from "../action/profile";
import {getCurrentProfile} from "../action/profile";
import { Link } from "react-router-dom";

const Editprofile = ({profile:{loading,profile},getCurrentProfile,createProfile,history})=>{
    const [formdata,setformdata]=useState({        
      bio:'',       
    });
    useEffect(()=>{
        getCurrentProfile();

        setformdata({
            bio:loading || !profile.bio ? '' :profile.bio,
        });
        },[loading,getCurrentProfile]);
    
    const { 
        bio,
         }=formdata;
         
       const onchange=(e)=>setformdata({
        ...formdata,
        [e.target.name]:e.target.value
        });
        const onSubmit = e =>{
            e.preventDefault();
            createProfile(formdata,history,true);
        }
    return(<div>
        <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
         
           
      <small className="form-text">Tell us a little about yourself</small>     
      
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"value={bio} onChange={(e)=>onchange(e)}></textarea>
          
        </div>

         
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </div>)
}

Editprofile.propsTypes = {
    createProfile:PropsTypes.func.isRequired,
    getCurrentProfile:PropsTypes.func.isRequired,
    profile:PropsTypes.object.isRequired
}

const mapSatateToProps = state =>({
    profile:state.profile
});

export default connect(mapSatateToProps,{createProfile,getCurrentProfile})(Editprofile);