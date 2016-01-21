import React from "react";
import ReactDOM from 'react-dom';
import Header from "../component/Header.component.jsx";
import Profile from "../component/Profile.component";

//ReactDOM.render(
//	<div>
//		<Header />
//		<Profile />
//	</div>
//	, document.getElementById('app'));


export default class ProfilePage extends React.Component {
	render () {
		return (
            <div>
                <Header />
                <Profile />
            </div>
		)
	}
}