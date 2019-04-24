import React, { Component } from "react";
import { connect } from "react-redux";
import UploadForm from "./UploadForm";
import { withStyles } from "@material-ui/core/styles";
import FileDisplay from "./FileDisplay";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40
  },
  container: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class FileUpload extends Component {
  //   state = {
  //     title: '',
  //     description: '',
  //     file: null
  //   };
  

  // submitFile = event => {
  //   event.preventDefault();
  //   this.props.dispatch({
  //     type: "ADD_FILE",
  //     payload: this.state
  //   }); 
  //   this.setState({
  //     title: '',
  //     description: '',
  //   });   
  // };

  // handleFileUpload = event => {
  //   this.setState({ 
  //     file: event.target.files 
  //   });
  // };

  // handleChangeFor = (property) => (event) => {
  //   this.setState ({
  //     ...this.state,
  //     [property]: event.target.value
  //   })
  // };

  render() {
     const { classes } = this.props;
    return (
      <div>
        {/* <form onSubmit={this.submitFile}>
          <input value={this.state.title} label="title" placeholder="Title" type="text" onChange={this.handleChangeFor('title')}/>
          <input value={this.state.description} label="description" placeholder="Description" type="text" onChange={this.handleChangeFor('description')} />
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileUpload}
          />
          <button type="submit">Send</button>
        </form> */}
        <div className={classes.root}>
        <div className={classes.container}>
        <UploadForm />
        <FileDisplay />
        </div>
      </div>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(mapReduxStateToProps)(FileUpload));


   