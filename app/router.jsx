import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './component/App.component.jsx';
import NotFoundPage from './page/NotFound.jsx';

import AuthorizationPage from './page/Authorization.jsx';
import ProfilePage from './page/Profile.jsx';
import SearchPage from './page/Search.jsx';


export default class RouterComponent extends React.Component {
    render () {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={AuthorizationPage}/>
                    <Route path="/search" component={SearchPage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="*" component={NotFoundPage}/>
                </Route>
            </Router>
        )
    }
}
