import React, { Component } from "react";
import axios from "axios";
import './AdminSelect.css'


class AdminSelect extends Component {
  state = {
    results: []
  };

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
    this.getResults();
  }

  getResults = () => {
    //make call to server using axios
    axios({
      method: "GET",
      url: "/api/user/all"
    })
      .then(response => {
        console.log('data here', response.data);
        this.setState({
          results: response.data
        });
        return this.adminList();
      })
      .catch(error => {
       //alert("could not get results");
        console.log("could not get results", error);
      });
  };

  adminList = () => {

    console.log("results:",this.state.results);

    return this.state.results.map(users => (
  
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
    console.log(this.state.results);
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

export default AdminSelect;
