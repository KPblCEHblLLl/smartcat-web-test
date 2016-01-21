import React from "react";
import cookie from "react-cookie";
import RaisedButton from 'material-ui/lib/raised-button';

export default class Authorization extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

	authAsManager() {
		cookie.save("role", "Manager");
		//location.href = "/search.html";
        this.context.router.push('/search');
	}
	authAsFreelancer() {
		cookie.save("role", "Freelancer");
		//location.href = "/search.html";
        this.context.router.push('/search');
	}
	render() {
		return (
			<div>
				<h2>Authorization</h2>
				<RaisedButton onClick={this.authAsManager.bind(this)} label="Manager" primary />
				&nbsp;
				<RaisedButton onClick={this.authAsFreelancer.bind(this)} label="Freelancer" secondary />
			</div>
		);
	}
}
