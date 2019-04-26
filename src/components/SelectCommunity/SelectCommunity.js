import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

class SelectCommunity extends Component {

  state = {
    anchorEl: null,
    community: {}
  };

  componentDidMount() {
		// get the community info
		this.props.dispatch({type: "FETCH_COMMUNITIES"});
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
	};
	
	handleSelection = selection => event => {
		if (this.props.onSelect) this.props.onSelect(selection);
		this.handleClose();
	}

  render() {

		const anchorEl = this.state.anchorEl;

    return (
      <div>
        <Button onClick={this.handleClick} variant="outlined" color="primary" >Select Community</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >

				{/* Map each community to its own menu option */}
				{ this.props.communities.map(community => 
          <MenuItem 
            key={community.id} 
            onClick={this.handleSelection(community.id)}>
            {community.name}
          </MenuItem>)}
        </Menu>
      </div>
    );
  }
}

const reduxMap = reduxState => reduxState;

export default connect(reduxMap)(SelectCommunity);