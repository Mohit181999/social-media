import React, { useEffect } from "react";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import {getIndipost} from "../../action/post";
import Spinner from "../layout/spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import Comments from "./comments"
import CommentItem from "./commentitem"
const Posti = ({getIndipost,post:{post,loading},match}) =>{
    useEffect(()=>{
        getIndipost(match.params.id)
    },[getIndipost,match.params.id])
    return (
         loading || post === null ? <Spinner /> : <div>
             <Link to="/posts" className="btn">Back to all posts</Link>
             <PostItem post = {post} showAction={false}/>
             <Comments postid= {post._id} />
             {post.comments.map(comment=>(
                 <CommentItem key={comment._id} comment={comment} postid={post._id} />
             ))}
         </div>
    )
}
Posti.propsTypes = {
    getIndipost:PropsTypes.func.isRequired,
    post:PropsTypes.object.isRequired
}
const mapStateToProps = state =>({
    post:state.post
});
export default connect(mapStateToProps,{getIndipost})(Posti)