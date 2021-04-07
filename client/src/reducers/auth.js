import {REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT, AUTH_ERROR,DELLETE_ACC} from "../action/type";

const intialState={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    loading:true,
    user:null
};

export default function(state=intialState,action){
    const {type, payload} =action;

    switch(type){
        case USER_LOADED:return{
            ...state,
            isAuthenticated:true,
            loading:false,
            user:payload
        }
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            };
        case REGISTER_FAIL:
            case AUTH_ERROR:
                case LOGIN_FAIL:
                    case LOGOUT:
                        case DELLETE_ACC:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null
            };
        default:
            return state

    }
}