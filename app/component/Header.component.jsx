import React from "react";
import cookie from "react-cookie";
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
	textAlign: "right",
};

const searchButtonStyle = {
	float: "left",
};

export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			role: cookie.load("role"),
		}
	}

	logOut() {
		cookie.save("role", "");
		location.href = "/authorization.html";
	}

	render() {
		return (
			<div style={style}>
				<a style={searchButtonStyle} href="/search.html"><RaisedButton label="Search" /></a>
				<span>{this.state.role}</span>
				<RaisedButton label="Log Out" onClick={this.logOut} />
				<hr/>
			</div>
		);
	}
}