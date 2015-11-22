import React from 'react';
import FontIcon from '../../../node_modules/material-ui/lib/font-icon';

export default class HoverFontIcon extends React.Component {
    state = {
        hover: false
    };

    static propTypes = {
        color: React.PropTypes.string.isRequired,
        hoverColor: React.PropTypes.string.isRequired
    };

    enter = () => {
        this.setState({hover: true});
    };

    leave = () => {
        this.setState({hover: false});
    };

    render() {
        const {color, hoverColor, ...other} = this.props;
        const merged = this.state.hover ? hoverColor : color;

        return (
            <FontIcon
                color={merged}
                onMouseEnter={this.enter}
                onMouseLeave={this.leave}
                {...other}>
                {this.props.children}
            </FontIcon>
        )
    }
}