import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from 'react-redux';

class AdminSelectRow extends Component {

	onDelete = () => {

		if (window.confirm("Are you sure you want to remove " + this.props.user.username + "?")) {

			this.props.dispatch({
				type: "DELETE_USER",
				payload: this.props.user.id,
			});
		}
};

setPropertyOf = (user, property, value) => (event) => {

	this.props.dispatch({
		type: "EDIT_USER",
		payload: { user, property, value: value }
	});
}

componentDidMount() {
	console.log(this.props);
}

  render() {

		const user = this.props.user;

    return (
      <TableRow>
        <TableCell> {user.username} </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.first_name} {user.last_name}</TableCell>
				
				{this.props.isSuperAdmin() &&
					(<TableCell>
						<Checkbox
							checked={user.is_super_admin}
							value={user.is_super_admin}
							color="primary"
							onChange={this.setPropertyOf(
								user,
								"is_super_admin",
								!user.is_super_admin
							)}
						/>
					</TableCell>)
				}

				{(this.props.isSuperAdmin() || this.props.isAdmin()) &&
					(<TableCell>
						<Checkbox
							checked={user.is_community_admin}
							value={user.is_community_admin}
							color="primary"
							onChange={this.setPropertyOf(
								user,
								"is_community_admin",
								!user.is_community_admin
							)}
						/>
					</TableCell>)
				}

        <TableCell>{user.community_name}</TableCell>

				{this.props.isAdmin() && 
				(<TableCell>
          {user.approved ? (
            "Approved"
          ) : (
            <Button onClick={this.setPropertyOf(user, "approved", true)}>
              Confirm
            </Button>
          )}
        </TableCell>
				)}

				{this.props.isAdmin() && 
        (<TableCell>
          <Button
            onClick={this.onDelete}
            className="deleteButton"
          >
            Delete
          </Button>
				</TableCell>)
				}

      </TableRow>
    );
  }
}

export default connect()(AdminSelectRow);
