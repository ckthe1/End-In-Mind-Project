import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class FileDisplay extends Component {


  deleteButton = () => {
    console.log('delete!');

    this.props.dispatch({
      type: "DELETE_FILE",
      payload: this.props.myFile.key,
    });

    return;

     axios({
       method: "DELETE",
       url: "/api/aws",
       params: {
         awsKey: this.props.myFile.key
       }
     })
  }


  render() {

    const file = this.props.myFile;
   

    return (
      <ul>
        <li>
          <a href={file.signedURL} download={file.signedURL}>
            {file.key}
          </a>
          <button onClick={this.deleteButton}>Delete</button>
        </li>
        {/* <li>size: {file.size}</li>
        <li>storageClass: {file.storageClass}</li>
        <li>URL: {file.signedURL}</li> */}
      </ul>
    );
  }
}

export default connect()(FileDisplay);
