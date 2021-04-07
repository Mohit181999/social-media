import React from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {delcomment} from "../../action/post"

const CommentItem =  ({delcomment,postid,comment:{_id,text,user,avatar,name,date},auth}) =>{
  
    return(<div><div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
 </div>
    <div>
      <p className="my-1">
         {text}
      </p>
       <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD" >{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (<button type="button"  onClick={e=>delcomment(postid,_id)} className="btn btn-danger"><i className="fas fa-times"></i>
    </button>)}
      
    </div>
    </div>
    </div>)
}

CommentItem.propsTypes = {
    comment:PropsTypes.object.isRequired,
    auth:PropsTypes.object.isRequired,
    postid:PropsTypes.number.isRequired,
    delcomment:PropsTypes.func.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{delcomment})(CommentItem);