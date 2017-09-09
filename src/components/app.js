import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

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

					<div id="buttons" style="padding-top: 2%">
						<Link class={style.menubutton} activeClassName={style.active} href="/symptoms">Symptoms&nbsp;report</Link>
						<Link class={style.menubutton} activeClassName={style.active} href="/feedback">Patient&nbsp;feedback</Link>
						<Link class={style.menubutton} activeClassName={style.active} href="/info">Hospitalization&nbsp;info</Link>
					</div>

					<Router onChange={this.handleRoute}>
						<Tip path="/" style="font-style: italic;" text="Please select an option to begin."/>
						<Tip path="/symptoms" style="font-weight: bold;" text="How are you feeling?"/>
						<Tip path="/feedback" style="font-weight: bold" text="How was your care?"/>
						<Tip path="/info" style="font-weight: bold" text="Learn more about your current status."/>
					</Router>
				</center>
			</div>
		);
	}
}
