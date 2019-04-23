import React, { Component } from "react";
import axios from "axios";
import './AdminSelect.css'
import { connect } from 'react-redux';


class AdminSelect extends Component {

  deleteButton = resultsId => {
    console.log("delete was clicked");

    axios({
      method: "DELETE",
      url: "/results/" + resultsId
    }).then(() => {
      this.getResults();
    });
  };

 

  componentDidMount() {
    // console.log('in component did mount');
    this.props.dispatch({ type: 'FETCH_USERS' })
  }

  adminList = () => {


    return this.props.users.map(users => (
  
        <tr key={users.id}>
          <td> {users.username} </td>

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
              <th>ID</th>
              <th>User</th>
              <th>Community Admin</th>
              <th>Committee Member</th>
           
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
