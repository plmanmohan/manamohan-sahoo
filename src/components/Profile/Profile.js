import React from 'react';

import './style.css';

export const Profile = ({ user, onDelete}) => (
  <div>
    <div className="container">
      <img
        className="avatar-img"
        src={user.avatar}
        alt={user.first_name}
      />
      <p className="userName">
        {user.first_name}
        {' '}
        {user.last_name}
      </p>
      <button type="button" className="delete" onClick={() => onDelete(user.id)}>
        Delete
      </button>
    </div>
  </div>
);
