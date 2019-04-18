import React, { Component } from "react";
import axios from "axios";

class FileDisplay extends Component {


  deleteButton = () => {
    console.log('delete!');

    let fileToDelete = {
      taco: this.props.myFile.key,
    }


    console.log(fileToDelete);

     axios({
       method: "DELETE",
       url: "/delete-file",
       params: {
         awsKey: this.props.myFile.key
       }
     }).then(() => {
       this.getResults();
     });
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

export default FileDisplay;
