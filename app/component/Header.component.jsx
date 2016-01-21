import React from "react";
import { Link } from 'react-router'
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

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	logOut() {
		cookie.save("role", "");
		//location.href = "/authorization.html";
        this.context.router.push('/');
	}

	render() {
		return (
			<div style={style}>
                <Link style={searchButtonStyle} to="/search"><RaisedButton label="Search" /></Link>
				<span>{this.state.role}</span>
				<RaisedButton label="Log Out" onClick={this.logOut.bind(this)} />
				<hr/>
			</div>
		);
	}
}