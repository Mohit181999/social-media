import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    followers,
    following,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>About</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
     {followers.length>0 && (
      <Fragment>
        <h2 className='text-primary'>Followers</h2>
        <p>{followers.length}</p>
        <div className='line' />
      </Fragment>
    )}
     {following.length>0 && (
      <Fragment>
        <h2 className='text-primary'>following</h2>
        <p>{following.length>0}</p>
        <div className='line' />
      </Fragment>
    )}
     
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;