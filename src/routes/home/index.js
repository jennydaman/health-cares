import { h, Component } from 'preact';
import style from '../../style/menu.scss';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<center><h1>Health Cares</h1></center>

				<button class="menuoption">Symptoms report</button>
				<button class="menuoption">User feedback</button>
				<button class="menuoption">Hospitalization info</button>
			</div>
		);
	}
}
