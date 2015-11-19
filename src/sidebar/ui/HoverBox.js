import React from 'react';

export default class HoverBox extends React.Component {
    state = {
        hover: false
    };

    static propTypes = {
        style: React.PropTypes.object,
        hoverStyle: React.PropTypes.object
    };

    enter = () => {
        this.setState({hover: true});
    };

    leave = () => {
        this.setState({hover: false});
    };

    render() {
        const {style, hoverStyle, ...other} = this.props;

        const merged = this.state.hover
            ? Object.assign({}, hoverStyle, style)
            : Object.assign({}, style);

        return (
            <div style={merged} onMouseEnter={this.enter} onMouseLeave={this.leave} {...other}>
                {this.props.children}
            </div>
        )
    }
}