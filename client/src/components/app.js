import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

import Buttons from './buttons'
import Tip from './tip';

import style from './style'

// import Home from 'async!./home';
// import Profile from 'async!./profile';

function SymptomsReport(props) {


	return <h1>Hello, {props.name}</h1>;
}

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};



	render() {
		return (
			<div id="app">

				<center>
					<h1>Health Cares</h1>

					<Buttons/>

					<Router id="widget" onChange={this.handleRoute}>
						<Tip path="/" style="font-style: italic;" text="Please select an option to begin."/>
						<Tip path="/symptoms" style="font-weight: bold;" text="How is it going??" link="https://goo.gl/forms/eE00IssHNCwdNgwW2"/>
						<Tip path="/feedback" style="font-weight: bold" text="How are you feeling?" link="https://goo.gl/forms/2VVXWRxJm2CKY6m52"/>
						<Tip path="/info" style="font-weight: bold" text="Learn more about your current status."/>
					</Router>
				</center>
			</div>
		);
	}
}
