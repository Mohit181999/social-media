import React,{useEffect} from "react";
import PropsTypes from "prop-types";
import {getAllPostuser} from "../../action/post";
import {connect} from "react-redux";
import Spinner from "../layout/spinner";
import Userpostitem from "./Userpostitem";
 

const Userposts = ({post:{posts},getAllPostuser}) =>{
    useEffect(()=>{
        getAllPostuser();
    },[getAllPostuser])
    return(<div>
        <div>
            <h2>Posts</h2>
             
            <div className='posts'>
                {posts.map(post =>(
                    <Userpostitem key={post._id} post={post}/>
                ))}
                </div>
        </div>
    </div>)
}

Userposts.propsTypes = {
    getAllPostuser:PropsTypes.func.isRequired,
    post:PropsTypes.object.isRequired
}

const mapStateToProps = state =>({

    
    post:state.post
})

export default connect(mapStateToProps,{getAllPostuser})(Userposts);