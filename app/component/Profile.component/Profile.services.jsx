import React from "react";
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export default class ProfileServices extends React.Component {

    renderTypes(type, ix) {
        if (type && type.tariffs && type.tariffs.length > 0) {
            var tariff = type.tariffs[0];

            return (
                <div key={ix}>
                    <span>{type.type}</span>

                    {
                        tariff ?
                        <span>{tariff.perWord} {tariff.currency}</span>
                        : null
                    }

                </div>
            )
        }

        return null;
    }

    renderService(service, ix) {
        if (service) {
            var { sourceLang, targetLang, types } = service;

            return (
                <Card key={ix}>
                    <CardHeader>{sourceLang} - {targetLang}</CardHeader>
                    <CardText>
                        {types.map(this.renderTypes, this)}
                    </CardText>
                </Card>
            );
        }

        return null;
    }

    render() {
        var { services } = this.props;

        if (services) {
            return (
                <div>
                    <h3>Services:</h3>
                    { services.map(this.renderService, this) }
                </div>
            )
        }

        return null;
    }
}