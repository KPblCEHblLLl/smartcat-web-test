import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import Authorization from "../component/Authorization.component.jsx";

//ReactDOM.render(<Authorization />, document.getElementById('app'));

export default class AuthorizationPage extends React.Component {

    render () {
        return (
            <Authorization />
        )
    }
}
