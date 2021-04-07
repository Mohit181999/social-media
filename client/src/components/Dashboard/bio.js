import React, { useState } from "react";
import PropsTypes from "prop-types";
import {Link} from "react-router-dom";
//import Moment from "react-moment";
import {connect} from "react-redux";
//import {deleteEdu} from "../../action/profile";

const  Bio = ({bio,followers,following})=>{
    const [showlist,setshowlist]=useState(false);

    return(<div>
        <h2 className="my-2">About</h2>
         
            <p>{bio}</p>
            <p>Followers: {followers.length} {showlist && followers.map(followers=>{
                return(
                    <div className="profile bg-light">
        <img src={followers.avatar} alt="" className="round-img"></img>
        <h2>{followers.name}</h2> 
        </div>
                )
            })
            }
            {followers.length>0 &&  <button type="submit" onClick={()=>setshowlist({showlist:true})}>Show</button>
            }
            </p>
            <p>Following: {following.length} {showlist && following.map(following=>{
                return(
                    <div className="profile bg-light">
        <img src={following.avatar} alt="" className="round-img"></img>
        <h2>{following.name}</h2> 
        </div>
                )
            })
            }
            {following.length>0 &&  <button type="submit" onClick={()=>setshowlist({showlist:true})}>Show</button>
            }
            </p>
            
            <p> </p>
             
    </div>)
}

 Bio.propsTypes = {
     bio:PropsTypes.object.isRequired,
     followers:PropsTypes.object.isRequired,
     following:PropsTypes.object.isRequired,
}

export default connect(null)(Bio);