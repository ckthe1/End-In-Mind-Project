import React, { Component } from "react";
import FileList from "./FileList";
import { connect } from "react-redux";

class FileUpload extends Component {
    state = {
      title: '',
      description: '',
      file: null
    };
  

  submitFile = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_FILE",
      payload: this.state
    });
    console.log('this.state', this.state);
    
  };

  handleFileUpload = event => {
    this.setState({ 
      title: event.target.value,
      description: event.target.value,
      file: event.target.files 
    });
  };

  handleChangeFor = event => () => {

    console.log(event.target.value);

  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFile}>
          <input label="title" placeholder="Title" type="text" onChange={this.handleChangeFor}/>
          <input label="description" placeholder="Description" type="text" onChange={this.handleChangeFor} />
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileUpload}
          />
          <button type="submit">Send</button>
        </form>
        <FileList />
      </div>
    );
  }
}

export default connect()(FileUpload);
