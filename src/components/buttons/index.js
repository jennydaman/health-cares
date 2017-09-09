import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

import style from './style'


export default class Buttons extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: false };
	}


	render() {
		return (

			<div id="buttons" style="padding-top: 2%;">
				<Link class={style.menubutton} activeClassName={style.active} href="/symptoms">Symptoms&nbsp;report</Link>
				<Link class={style.menubutton} activeClassName={style.active} href="/feedback">Patient&nbsp;feedback</Link>
				<Link class={style.menubutton} activeClassName={style.active} href="/info">Hospitalization&nbsp;info</Link>
			</div>
			
		);
	}
}
