import React,{useState} from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {createProfile} from "../action/profile";
const Createprofile = ({createProfile,history})=>{
    const [formdata,setformdata]=useState({
       bio:'',    
    });
    const { 
        bio,
         }=formdata;

       const onchange=(e)=>setformdata({
        ...formdata,
        [e.target.name]:e.target.value
        });
        const onSubmit = e =>{
            e.preventDefault();
            createProfile(formdata,history);
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
         
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"value={bio} onChange={(e)=>onchange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>        
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </div>)
}

Createprofile.propsTypes = {
    createProfile:PropsTypes.func.isRequired
}

export default connect(null,{createProfile})(Createprofile);