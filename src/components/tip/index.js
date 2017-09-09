import { h, Component } from 'preact';
import style from './style'

export default class Tip extends Component {
	render() {
		return (
			<div>
				<footer style={"font-size: 200%; " + this.props.style}>{this.props.text}</footer>

				<a class={style.pink} href={this.props.link}>Continue (click/tap here)</a>
			</div>
		);
	}
}
