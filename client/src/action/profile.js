import axios from "axios";
import {setAlert} from"./alert"
import {PROFILE_SUCCESS,
        PROFILE_ERROR,
        UPDATE_PROFILE, 
        CLEAR_PROFILE,
        DELLETE_ACC,
        GET_PROFILES,
        UPDATE_FOLLOWERS,
        UPDATE_FOLLOWING,
      GET_FOLLOWERS,GET_FOLLOWING} from "./type";

export const getCurrentProfile = () => async dispatch => {
    try {
      const res = await axios.get('/API/profile/me');
  
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data
      });
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

  export const createProfile=(formdata,history,edit=false)=> async dispatch=>{
    try {
      const config={
        header:{
          'Content-type':'application/json'
        }
      }
      const res=await axios.post('/API/profile',formdata,config);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert(edit?'Profile Updated':'Profile _Created'));
      if(!edit)history.push('/dashboard');
    } catch (err) {
       
     
    dispatch({
      type: PROFILE_ERROR,
    });
    }
  } 
  
  
  export const deleteAcc= ()=>async dispatch=>{
    if(window.confirm('Are you sure you want to delete account')){
      try {
        await axios.delete('/API/profile');
        dispatch({type:CLEAR_PROFILE});
        dispatch({type:DELLETE_ACC});
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
        });
      }
    }
  }
  export const getAllProfiles=()=>async dispatch=>{
    dispatch({type:CLEAR_PROFILE});
    try {
      const res=await axios.get('/API/profile');
      dispatch({
        type:GET_PROFILES,
        payload:res.data
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  }
  export const getProfileByid =id=>async dispatch=>{
    try {
      const res=await axios.get(`/API/profile/user/${id}`);

      dispatch({
        type:PROFILE_SUCCESS,
        payload:res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  }
  export const followUser = (id) => async (dispatch) => {
   
    const res = await axios.put(`/API/profile/following/${id}`);
     
    dispatch(setAlert('FOLLOWING','SUCCESS'));
    dispatch({
      type: UPDATE_FOLLOWERS,
      payload:{id,follower:res.data}
    });
   
     
    
  };
  export const unfollowUser = (id) => async (dispatch) => {
    const res = await axios.put(`/API/profile/unfollow/${id}`);

     
    dispatch({
      type: UPDATE_FOLLOWERS,
      payload:{id,follower:res.data}
    });
    dispatch(setAlert('UNFOLLOWED','SUCCESS'));
    
    
  };

  export const getFollowers = userId => async (dispatch) => {
    const result = await axios.get(`/users/${userId}`);
    return dispatch({
      type: GET_FOLLOWERS,
      payload: result.data
    });
  };
  
  export const getFollowing = userId => async (dispatch) => {
    const result = await axios.get(`/users/${userId}`);
    return dispatch({
      type: GET_FOLLOWING,
      payload: result.data
    });
  };
  