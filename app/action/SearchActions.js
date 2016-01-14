/**
 * Created by d.lubimov on 18.01.2016.
 * @module
 */

import appDispatcher from "../dispatcher/AppDispatcher"
import * as actionsList from "../constant/action/search"

export function doSearch() {
	appDispatcher.dispatch({
		actionType: actionsList.DO_SEARCH
	});
}
