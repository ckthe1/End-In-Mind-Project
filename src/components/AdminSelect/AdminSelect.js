import React, { Component } from "react";
import axios from "axios";
import './AdminSelect.css'
import { connect } from 'react-redux';


class AdminSelect extends Component {

  deleteButton = userId => {
        this.props.dispatch({
          type: "DELETE_USER",
          payload: userId
        });

  };

 

  componentDidMount() {
    // console.log('in component did mount');
    this.props.dispatch({ type: 'FETCH_USERS' })
  }


  setPropertyOf = (user, property, value) => (event) => {

    console.log('setting', property, ' to ', value);

    this.props.dispatch({
      type: "EDIT_USER",
      payload: { user, property, value: value }
    });
  }

  adminList = () => {


    return this.props.users.map(users => (
      <tr key={users.id}>
        <td> {users.username} </td>
        <td>{users.email}</td>
        <td>{users.fullname}</td>
        <td>
          <input
            type="checkbox"
            value={users.is_super_admin}
            checked={users.is_super_admin}
            onChange={this.setPropertyOf(users, "is_super_admin", !users.is_super_admin)}
          />
        </td>
        <td>
          <input
            type="checkbox"
            value={users.is_community_admin}
            checked={users.is_community_admin}
            onChange={this.setPropertyOf(users, "is_community_admin", !users.is_community_admin)}
          />
        </td>
        <td>{users.community_name}</td>
        <td>
          {users.approved ? (
            "Approved"
          ) : (
            <button onClick={this.setPropertyOf(users, "approved", true)}>
              Confirm
            </button>
          )}
        </td>
        <td>
          <button
            onClick={() => this.deleteButton(users.id)}
            className="deleteButton"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Super Admin</th>
              <th>Community Admin</th>
              <th>Community</th>
              <th>Approved</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.adminList()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;


export default connect(mapStateToProps)(AdminSelect);
