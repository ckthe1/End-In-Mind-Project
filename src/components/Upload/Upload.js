import React, { Component } from "react";
import axios from "axios";
import FileList from './FileList';
import { connect } from 'react-redux';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = event => {
    event.preventDefault();

    this.props.dispatch({
      type: 'ADD_FILE',
      payload: this.state.file,
    });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };






  render() {
    return (
      <div>
        <form onSubmit={this.submitFile}>
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileUpload}
          />
          <button type="submit">Send</button>
        </form>
        <FileList/>
      </div>
    );
  }
}

export default connect()(FileUpload);
