import React from 'react';
import PropTypes from 'prop-types';
//css
import './UserDetails.css';

//component to display user details
const UserDetails = ({ userImage, displayName}) => {
  return (
    <div className='user-details-container'>
      <img alt='user' className='user-image' src={userImage} />
      <p className='user-name'>{displayName}</p>
    </div>
  );
};

UserDetails.propTypes = {
  userImage: PropTypes.string,
  displayName: PropTypes.string
};

export default UserDetails;
