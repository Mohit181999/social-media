import React, { useState } from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {addcomment} from "../../action/post";

const Comments = ({postid,addcomment}) => {
    const [text,settext] = useState();
    return(<div>
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addcomment(postid,{text});
            settext('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Enter a comment"
            value={text}
            onChange={(e)=>settext(e.target.value)}
             ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>)
}

Comments.propsTypes = {
    addcomment:PropsTypes.func.isRequired
}

export default connect(null,{addcomment})(Comments);