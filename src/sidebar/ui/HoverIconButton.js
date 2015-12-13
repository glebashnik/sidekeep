import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

export default class HoverIconButton extends React.Component {
    static propTypes = {
        color: React.PropTypes.string,
        hoverColor: React.PropTypes.string
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
        const {color, hoverColor, iconStyle, ...other} = this.props;
        const style = Object.assign({}, iconStyle);

        if (color)
            style.color = color;

        if (hoverColor && this.state.hover)
            style.color = hoverColor;

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