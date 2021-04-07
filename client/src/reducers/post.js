import {GET_POSTS,POSTS_ERR,UPDATE_LIKES,DELETE_POSTS,ADD_POST,GET_POST,ADD_COMMENT,DELETE_COMMENT} from '../action/type';
const intialState ={
    posts:[],
    post:null,
    loading:true,
    error:{}
    
}

export default function(state=intialState,action){
    const {type,payload} = action;
    switch(type){
        case GET_POSTS:
            return{
                ...state,
                posts:payload,
                loading:false
            }
        case ADD_POST:
            return{
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }
        case GET_POST:
            return{
                ...state,
                post:payload,
                loading:false
            }
        case DELETE_POSTS:
            return{
                ...state,
                posts:state.posts.filter(post => post._id!==payload),
                loading:false
            }
        case ADD_COMMENT:
            return{
                ...state,
                post:{...state.post,comments:payload},
                loading:false
            }
        case DELETE_COMMENT:
            return{
                ...state,
                post:{...state.post,
                    comments:state.post.comments.filter(com=>com._id!==payload)
                },
                loading:false
            }
        case POSTS_ERR:
            return{
                ...state,
                loading:false
            }
            case UPDATE_LIKES:
                return {
                  ...state,
                  posts: state.posts.map(post =>
                    post._id === payload.id
                      ? {
                          ...post,
                          likes: payload.likes
                        }
                      : post
                  ),
                  loading: false
                };
        default:return state
    }
}