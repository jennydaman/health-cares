import { h, Component } from 'preact';
import style from './style';

export default class MenuButton extends Component {

    render() {
        return (
            <button class={style.menubutton} onClick={"location.href=" + this.props.path}>{this.props.label}</button>            
        );
    }
}