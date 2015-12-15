import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

export default class HoverIconButton extends React.Component {
    static propTypes = {
        color: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        selectColor: React.PropTypes.string,
        selected: React.PropTypes.bool
    };

    state = {
        hover: false
    };

    enter = () => {
        this.setState({hover: true});
    };

    leave = () => {
        this.setState({hover: false});
    };

    render() {
        const {color, hoverColor, selectColor, selected, iconStyle, ...other} = this.props;
        const style = Object.assign({}, iconStyle);

        if (color)
            style.color = color;

        if (hoverColor && this.state.hover)
            style.color = hoverColor;

        if (selectColor && selected)
            style.color = selectColor;

        return (
            <IconButton
                iconStyle={style}
                onMouseEnter={this.enter}
                onMouseLeave={this.leave}
                {...other}>
                {this.props.children}
            </IconButton>
        )
    }
}