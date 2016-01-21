import React from "react";
import profileStorage from "../../storage/ProfileStorage"
import * as profileActionsList from "../../action/ProfileActions"
import * as profileEventsList from "../../constant/event/profile"

import ProfileLocations from './Profile.locations';
import ProfileServices from './Profile.services';

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
        var { profile } = this.state;

        if (profile) {
            //удобно, всегда вижу какие поля испозьзуются в рендере, даже если там большая портянка
            //потом легко рефакторить и менять код
            var { name, location, services } = profile;

            return (
                <div>
                    <h2>Freelancer profile: {name}</h2>
                    <ProfileLocations location={location}/>
                    <ProfileServices services={services}/>
                </div>
            )
        }

        return null;
    }
}