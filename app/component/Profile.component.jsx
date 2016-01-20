import React from "react";
import profileStorage from "../storage/ProfileStorage"
import * as profileActionsList from "../action/ProfileActions"
import * as profileEventsList from "../constant/event/profile"
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

function getProfileState() {
	return {
		profile: profileStorage.getProfile(),
	}
}

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = getProfileState();

		this.createBounds();
	}

	createBounds() {
		this._onProfileChange = this._onProfileChange.bind(this);
	}

	componentDidMount() {
		profileStorage.addListner(profileEventsList.PROFILE_CHANGED, this._onProfileChange);
		profileActionsList.doLoadProfile();
	}

	componentWillUnmount() {
		profileStorage.removeListner(profileEventsList.PROFILE_CHANGED, this._onProfileChange);
	}

	_onProfileChange() {
		this.setState(getProfileState());
	}

	render() {
		var profile = this.state.profile;
		if (!profile) {
			return <div/>;
		}
		let locationEl;
		if (profile.location != null) {
			locationEl = (
				<div>
					<div>country: {profile.location.countryCode}</div>
					<div>city: {profile.location.city}</div>
					<div>timezone: {profile.location.timezone.standardName}</div>
				</div>
			);
		}

		let servicesEl = profile.services.map((service, ix) => {
			let lypesEl = service.types.map((type, ix) => {
				let tariff = type.tariffs[0];

				let tariffEl;
				if (tariff != null) {
					tariffEl = <span>{tariff.perWord} {tariff.currency}</span>
				}
				return (
					<div key={ix}>
						<span>{type.type}</span>
						{tariffEl}
					</div>
				);
			});

			return (
				<Card key={ix}>
					<CardHeader>{service.sourceLang} - {service.targetLang}</CardHeader>
					<CardText>
						{lypesEl}
					</CardText>
				</Card>
			);
		});

		return (
			<div>
				<h2>Freelancer profile: {this.state.profile.name}</h2>
				<h3>Location:</h3>
				{locationEl}

				<h3>Services:</h3>
				{servicesEl}
			</div>
		);
	}
}