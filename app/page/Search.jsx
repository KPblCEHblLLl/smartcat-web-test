import React from "react";
import ReactDOM from 'react-dom';
import Header from "../component/Header.component.jsx";
import Search from "../component/Search.component.jsx";

//ReactDOM.render(
//	<div>
//		<Header />
//		<Search />
//	</div>, document.getElementById('app'));

export default class SearchPage extends React.Component {
	render () {
		return (
			<div>
				<Header />
				<Search />
			</div>
		)
	}
}