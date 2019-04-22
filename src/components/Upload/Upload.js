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
    this.setState({
      title: '',
      description: '',
    });   
  };

  handleFileUpload = event => {
    this.setState({ 
      file: event.target.files 
    });
  };

  handleChangeFor = (property) => (event) => {
    this.setState ({
      ...this.state,
      [property]: event.target.value
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFile}>
          <input value={this.state.title} label="title" placeholder="Title" type="text" onChange={this.handleChangeFor('title')}/>
          <input value={this.state.description} label="description" placeholder="Description" type="text" onChange={this.handleChangeFor('description')} />
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
