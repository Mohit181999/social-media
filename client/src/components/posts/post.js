import React,{useEffect} from "react";
import PropsTypes from "prop-types";
import {getAllPosts} from "../../action/post";
import {connect} from "react-redux";
import Spinner from "../layout/spinner";
import PostItem from "./PostItem";
import Postform from "./Postform";

const Post = ({post:{posts,loading},getAllPosts}) =>{
    useEffect(()=>{
        getAllPosts();
    },[getAllPosts])
    return(<div>
        {loading?<Spinner />:(<div>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'/>Welcome to the community
            </p>
            <div className='posts'>
                <Postform />
                {posts.map(post =>(
                    <PostItem key={post._id} post={post}/>
                ))}
                </div>
        </div>)}
    </div>)
}

Post.propsTypes = {
    getAllPosts:PropsTypes.func.isRequired,
    post:PropsTypes.object.isRequired
}

const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getAllPosts})(Post);