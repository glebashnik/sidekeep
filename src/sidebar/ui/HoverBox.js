import React from 'react';

export default class HoverBox extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        hoverStyle: React.PropTypes.object
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

    isHover = () => {
        return this.state.hover;
    };

    render() {
        const {style, hoverStyle, ...other} = this.props;

        const merged = this.state.hover
            ? Object.assign({}, style, hoverStyle)
            : Object.assign({}, style);

        return (
            <div style={merged} onMouseEnter={this.enter} onMouseLeave={this.leave} {...other}>
                {this.props.children}
            </div>
        )
    }
}