import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

//css
import './UserDetails.css';

//component to display user details
class UserDetails extends PureComponent{ 

 render()
 {
  return (
    <div className='user-details-container'>
      <img alt='user' className='user-image' src={this.props.userImage} />
      <p className='user-name'>{this.props.displayName}</p>
     </div>);
  }
};

UserDetails.propTypes = {
  userImage: PropTypes.string,
  displayName: PropTypes.string
};


export default UserDetails