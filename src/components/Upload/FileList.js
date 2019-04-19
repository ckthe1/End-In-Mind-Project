import React, { Component } from "react";
import axios from "axios";
import FileDisplay from "./FileDisplay";

class FileList extends Component {

  state = {
    files: [],
  }

  componentDidMount() {
    this.getFiles();
  }

  getFiles = () => {
    console.log('hi im gettinr files ok');
    axios.get('aws')
    .then(response => {
      console.log(response.data.siftedArray);
      this.setState({files: response.data.siftedArray});
    })

    .catch(error => {
      console.log('error with getting files', error);
    })
  }

  render() {
    return (
      <div>
        {this.state.files.map((file, index) => 
          <FileDisplay myFile={file} key={index}/>)}
      </div>
    );
  }
}

export default FileList;
