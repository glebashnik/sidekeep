import React from 'react';

export default class HoverBox extends React.Component {
    state = {
        hover: false
    };

    static propTypes = {
        style: React.PropTypes.object.isRequired,
        hoverStyle: React.PropTypes.object.isRequired
    };

    enter = () => {
        this.setState({hover: true});
    };

    leave = () => {
        this.setState({hover: false});
    };

    render() {
        const {style, hoverStyle, ...other} = this.props;

        const merged = Object.assign({}, style);

        if (this.state.hover)
            Object.assign(merged, hoverStyle);

        return (
            <div style={merged} onMouseEnter={this.enter} onMouseLeave={this.leave} {...other}>
                {this.props.children}
            </div>
        )
    }
}