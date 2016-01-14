import React from "react";
import cookie from "react-cookie";
import RaisedButton from 'material-ui/lib/raised-button';

export default class Authorization extends React.Component {
	authAsManager() {
		cookie.save("role", "Manager");
		location.href = "/search.html";
	}
	authAsFreelancer() {
		cookie.save("role", "Freelancer");
		location.href = "/search.html";
	}
	render() {
		return (
			<div>
				<h2>Authorization</h2>
				<RaisedButton onClick={this.authAsManager} label="Manager" primary />
				&nbsp;
				<RaisedButton onClick={this.authAsFreelancer} label="Freelancer" secondary />
			</div>
		);
	}
}
