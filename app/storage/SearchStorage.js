/**
 * Created by d.lubimov on 18.01.2016.
 * @module
 */
import appDispatcher from "../dispatcher/AppDispatcher"
import * as actionsList from "../constant/action/search"
import * as eventsList from "../constant/event/search"
import EventEmitter from "events"
import request from "reqwest"

function doSearch() {
	request("http://localhost:8100/app/api-reponse/search.json").then(
		function(data) {
			_list = data.list;
			_total = data.total;
			storage.emitChange();
		}
	)

}

var _list = [];
var _total = 0;

class SearchStorage extends EventEmitter {
	getList() {
		return _list;
	}
	getTotal() {
		return _total;
	}

	emitChange() {
		this.emit(eventsList.LIST_CHANGED);
	}

	addListner(event, callback) {
		this.on(event, callback);
	}

	removeListner(event, callback) {
		this.on(event, callback);
	}
}

const storage = new SearchStorage();
export default storage;

appDispatcher.register(function(action) {
	switch (action.actionType) {
		case actionsList.DO_SEARCH:
			doSearch();
			break;
	}
});

