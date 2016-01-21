import React from "react";

export default class ProfileLocations extends React.Component {
    render() {
        var { location } = this.props;

        if (location) {
            var { countryCode, city, timezone } = location;
            var standardName = timezone ? timezone.standardName : null;

            //если есть что-то в блоке - выводим блок
            if (countryCode || city || standardName) {
                return (
                    <div>
                        <h3>Location:</h3>
                        { countryCode ? <div>country: {countryCode}</div> : null }
                        { city ? <div>city: {city}</div> : null }
                        { standardName ? <div>timezone: {standardName}</div> : null }
                    </div>
                )
            }
        }

        return null;
    }
}