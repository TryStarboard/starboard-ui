import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteAccount} from '../actions';

class UserProfile extends Component {
  render() {
    const {
      user: {avatar, email, displayname} = {}
    } = this.props;

    return (
      <div className='userprofile'>
        <img className='userprofile__avatar' src={ avatar }></img>
        <h3 className='userprofile__displayname'>{ displayname }</h3>
        <h6 className='userprofile__email'>Email: { email }</h6>
        <button
          className='userprofile__delete-button'
          onClick={ deleteAccount }>
          Delete Account
        </button>
      </div>
    );
  }
}

export default connect(
  ({user}) => ({user})
)(UserProfile);
