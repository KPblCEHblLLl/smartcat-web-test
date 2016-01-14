/**
 * Created by d.lubimov on 18.01.2016.
 * @module
 */
import React from "react";
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from "material-ui/lib/raised-button"

const buttonStyle = {
	float: "right",
};

const descrStyle = {
	marginRight: "12px",
	display: "inline-block",
};

export default class FreelancerCard extends React.Component {
	render() {
		let freelancer = this.props.freelancer;
		let link = "/profile.html?id=" + freelancer.id;
		let service = freelancer.services[0];
		let type = service && service.types[0];
		let tariff = type && type.tariffs[0];

		let pairEl;
		let typeEl;
		let tariffEl;
		if (service != null) {
			pairEl = <span style={descrStyle}>{service.sourceLang} - {service.targetLang}</span>
		}
		if (type != null) {
			typeEl = <span style={descrStyle}>{type.type}</span>
		}
		if (tariff != null) {
			tariffEl = <span style={descrStyle}>{tariff.perWord} {tariff.currency}</span>
		}
		return (
			<Card>
				<CardHeader>
					{this.props.freelancer.name}
					<a href={link} style={buttonStyle}>
						<RaisedButton label="Open Profile"/>
					</a>
				</CardHeader>
				<CardText>
					{pairEl}
					{typeEl}
					{tariffEl}
				</CardText>
			</Card>
		);
	}
}
