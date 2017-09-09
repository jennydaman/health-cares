import { h, Component } from 'preact';

export default class Tip extends Component {
	render() {
		return (
			<footer style={"font-size: 200%; " + this.props.style}>{this.props.text}</footer>
		);
	}
}
