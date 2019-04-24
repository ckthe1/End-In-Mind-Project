import React, { Component } from "react";
import axios from "axios";
import FileDisplay from "./FileDisplay";
import { connect } from 'react-redux';

class FileList extends Component {

  state = {
    files: [],
  }

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_FILES'})
  }

  getFiles = () => {
    console.log('hi im gettinr files ok');
    axios.get('api/aws')
    .then(response => {
      console.log(response.data.siftedArray);
      this.setState({files: response.data.siftedArray});
    })

    .catch(error => {
      console.log('error with getting files', error);
    })
  }

  render() {
    console.log(this.props);
    
    return (
      <div>
        {/* <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.props.AWS.map((file, index) => (
              <tr>
                <FileDisplay myFile={file} key={index} />
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FileList);
