import React, { useState,useEffect } from "react";
import PropsTypes from "prop-types";
import { connect } from "react-redux"
import {addpost, editpost}from "../../action/post";
import {getIndipost} from "../../action/post"

const Editpost = ({getIndipost,editpost,post:{post,loading},match}) =>{
    const [formdata,setformdata]=useState({
      text:'',
      showAction:true
    });
    const {text,showAction} = formdata;  
    useEffect(()=>{
        getIndipost(match.params.id);
        setformdata({
            text:loading || !post.text ? '' :post.text,
        });
        },[loading,getIndipost,match.params.id]);
       
    return(<div>
         <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
                        e.preventDefault();
            editpost(formdata,match.params.id);
    
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e)=>setformdata({...formdata,text:e.target.value})}
            required></textarea><p>
             <input type="checkbox" 
               
              onClick={()=>
              setformdata({...formdata,showAction:!showAction}
              )}/> Disable action</p>
              <button type="submit" className="btn btn-dark my-1"  >submit</button>          
        </form>
      </div>
    </div>)
}

Editpost.propsTypes = {
    getIndipost:PropsTypes.func.isRequired,
    editpost:PropsTypes.func.isRequired,
    post:PropsTypes.object.isRequired
    
}
const mapSatateToProps = state =>({
    post:state.post
});

export default connect(mapSatateToProps,{getIndipost,editpost})(Editpost)