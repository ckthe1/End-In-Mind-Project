import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';

class FileDisplay extends Component {

  state = {
    signedUrl: '',
  }

  componentDidMount() {

    console.log('file dispay mounted');

    axios({
      method: 'GET',
      url:'/api/aws/signed-url', 
      params: {key: this.props.myFile.key},
    })
    .then( response => {
      console.log('got signed url', response);
      this.setState({signedUrl: response.data.signedUrl});
    })
    .catch(error => {
      console.log(error);
    })
  }

  deleteButton = () => {
    this.props.dispatch({
      type: "DELETE_FILE",
      payload: this.props.myFile.key,
    });

    return;
  }

  filesList () {
    return 
 
  }


  render() {

    const file = this.props.myFile;

    console.log('my file url', file);

    return (
      <div>
        <td> {this.props.myFile.title} </td>
        <td>{this.props.myFile.description}</td>
        <td>
          <a href={this.state.signedUrl} download={this.state.signedUrl}>
            {this.state.signedUrl}
          </a>
        </td>
        <td>
          <button onClick={this.deleteButton}>Delete</button>
        </td>
      </div>
    );
  }
}

export default connect()(FileDisplay);
