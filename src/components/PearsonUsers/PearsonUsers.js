import React, { Component } from 'react';
import { Profile } from '../Profile';
import { removeUser, removeDuplicateUsers } from '../../utility/user-functions';
import './style.css';
import api from '../../utility/api';

export class PearsonUsers extends Component {
  /**
   * Here initial state is defined
   * @param {*}
   */
  constructor() {
    super();
    this.state = {
      users: [
        {
          id: 4,
          first_name: 'Eve',
          last_name: 'Holt',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg'
        },
        {
          id: 5,
          first_name: 'Charles',
          last_name: 'Morris',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg'
        },
        {
          id: 6,
          first_name: 'Tracey',
          last_name: 'Ramos',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg'
        }
      ],
      isLoading: false,
      error: false
    };

    this.removeUser = this.removeUser.bind(this);
  }


  componentDidMount() {
    this.fetchTheData();
  }

  fetchTheData() {
    this.setState({ isLoading: true });
    api()
      .then((result) => {
        const updatedUserList = this.removeDuplicateUsers(result.data);
        this.setState({ users: updatedUserList, isLoading: false });
      })
      .catch(() => {
        this.setState({ error: true, isLoading: false });
      });
  }

  removeDuplicateUsers(userList) {
    return removeDuplicateUsers(this.state.users, userList);
  }

  displayUsers() {
    return this.state.users.map(user => (
      <Profile key={user.id} user={user} onDelete={this.removeUser} />
    ));
  }

  removeUser(id) {
    this.setState({ users: removeUser(this.state, id) });
  }

  render() {
    const { isLoading, error } = this.state;
    return (
      <div className="pearon-users">
        <h1 className="heading">Pearson User Management </h1>
        <div className="user-container">
          {isLoading ? (
            <div className="loader">
              <img
                height={80}
                width={80}
                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif"
                alt="loading"
              />
            </div>
          ) : (
            this.displayUsers()
          )}
          {error ? 'Error in loading' : ''}
        </div>
      </div>
    );
  }
}
