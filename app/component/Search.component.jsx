import React from "react"
import RaisedButton from "material-ui/lib/raised-button"
import FreelancerCard from "./FreelancerCard.component"
import searchStorage from "../storage/SearchStorage"
import * as searchActionsList from "../action/SearchActions"
import * as searchEventsList from "../constant/event/search"


function getSearchState() {
	return {
		list: searchStorage.getList(),
		total: searchStorage.getTotal()
	}
}
function doSearch() {
	searchActionsList.doSearch();
}

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = getSearchState();

		this.createBounds();
	}

	createBounds() {
		this._onListChange = this._onListChange.bind(this);
	}

	componentDidMount() {
		searchStorage.addListner(searchEventsList.LIST_CHANGED, this._onListChange);
	}

	componentWillUnmount() {
		searchStorage.removeListner(searchEventsList.LIST_CHANGED, this._onListChange);
	}

	_onListChange() {
		this.setState(getSearchState());
	}

	render() {
		let total;
		if (this.state.total != 0) {
			total = <div className="search__total"><span>total: {this.state.total}</span></div>;
		}
		return (
			<div>
				<RaisedButton label="Do Search" onClick={doSearch} secondary/>
				<div className="search__list">
					{this.state.list.map((item, key) =>
					<FreelancerCard key={key} freelancer={item} />
						)}
				</div>
				{total}
			</div>
		);
	}
}
