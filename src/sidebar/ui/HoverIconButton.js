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
        const mergedIconStyle = Object.assign({}, iconStyle);

        if (color)
            mergedIconStyle.color = color;

        if (hoverColor && this.state.hover)
            mergedIconStyle.color = hoverColor;

        if (selectColor && selected)
            mergedIconStyle.color = selectColor;

        return (
            <IconButton
                iconStyle={mergedIconStyle}
                onMouseEnter={this.enter}
                onMouseLeave={this.leave}
                {...other}>
                {this.props.children}
            </IconButton>
        )
    }
}