/**
 * Created by d.lubimov on 18.01.2016.
 * @module
 */
import appDispatcher from "../dispatcher/AppDispatcher"
import * as actionsList from "../constant/action/profile"
import * as eventsList from "../constant/event/profile"
import EventEmitter from "events"
import request from "reqwest"

function loadProfile() {
	let id = "";
	let params = location.search.replace(/^\?/, "").split("&");
	for (var i = 0; i < params.length; i++) {
		var pair = params[i].split("=");
		if (pair[0] == "id") {
			id = pair[1];
		}
	}
	request("http://localhost:8100/app/api-reponse/freelancer/" + id + ".json").then(
		function(freelancer) {
			_freelancer = freelancer;
			storage.emitChange();
		}
	)
}

var _freelancer = null;

class ProfileStorage extends EventEmitter {
	getProfile() {
		return _freelancer;
	}

	emitChange() {
		this.emit(eventsList.PROFILE_CHANGED);
	}

	addListner(event, callback) {
		this.on(event, callback);
	}

	removeListner(event, callback) {
		this.on(event, callback);
	}
}

const storage = new ProfileStorage();
export default storage;


appDispatcher.register(function(action) {
	switch (action.actionType) {
		case actionsList.DO_LOAD_PROFILE:
			loadProfile();
			break;
	}
});

