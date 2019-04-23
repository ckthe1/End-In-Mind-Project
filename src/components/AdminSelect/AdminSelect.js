import React, { Component } from "react";
import axios from "axios";
import './AdminSelect.css'
import { connect } from 'react-redux';


class AdminSelect extends Component {

  deleteButton = resultsId => {
    console.log("delete was clicked");

    axios({
      method: "DELETE",
      url: "/" + resultsId
    }).then(() => {
      this.getResults();
    });
  };

 

  componentDidMount() {
    // console.log('in component did mount');
    this.props.dispatch({ type: 'FETCH_USERS' })
  }

  setPropertyOf = (user, property) => (event) => {
    console.log("adjusting property", property);

    // TODO  value is placeholder, we need to change it llater
    axios.put("/api/user", {user, property, value: true})

    .then(response => {
        console.log('yay we did it');
    })

    .catch(error => { console.log(error)});
  }

  adminList = () => {


    return this.props.users.map(users => (
      <tr key={users.id}>
        <td> {users.username} </td>
        <td>{users.email}</td>
        <td>{users.fullname}</td>
        <td>
          <input
            type="radio"
            value={users.is_super_admin}
            onChange={this.setPropertyOf(users, "is_super_admin")}
          />
        </td>
        <td>
          <input
            type="radio"
            value={users.is_community_admin}
            onChange={this.setPropertyOf(users, "is_community_admin")}
          />
        </td>
        <td>{users.community_name}</td>
        <td>
          {users.approved ? (
            "Approved"
          ) : (
            <button onClick={this.setPropertyOf(users, "approved")}>Confirm</button>
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
