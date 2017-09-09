import { h, Component } from 'preact';
import MenuButton from '../../components/menubutton'
import style from './style'

export default class Home extends Component {
	render() {
		return (
			<div class="home">
				<center>
					<h1>Health Cares</h1>

					<MenuButton path="/symptoms" label="Symptoms report"/>
					<MenuButton path="/feedback" label="User Feedback"/>
					<MenuButton path="/info" label="Hospitalization Info"/>

					<footer class="tip"><i style="font-size: 200%">Select an option to begin.</i></footer>
				</center>
			</div>
		);
	}
}
