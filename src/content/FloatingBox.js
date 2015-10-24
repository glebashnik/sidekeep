import React from 'react';

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getStateFromDocument() {
    var html = document.documentElement;

    return {
        scrollTop: window.scrollY,
        scrollLeft: window.scrollX,
        clientWidth: html.clientWidth,
        clientHeight: html.clientHeight
    };
}

export default class FloatingBox extends React.Component {
    static propTypes = {
        top: React.PropTypes.number.isRequired,
        left: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        style: React.PropTypes.object
    };

    updateState = () => {
        this.setState(getStateFromDocument());
    };

    componentWillMount() {
        window.addEventListener('scroll', this.updateState);
        window.addEventListener('resize', this.updateState);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateState);
        window.removeEventListener('resize', this.updateState);
    }

    render() {
        var top = clamp(
            this.props.top - this.state.scrollTop,
            0,
            this.state.clientHeight - this.props.height
        );

        var left = clamp(
            this.props.left - this.state.scrollLeft,
            0,
            this.state.clientWidth - this.props.width
        );

        var style = Object.assign({
            position: 'fixed',
            top: top,
            left: left,
            width: this.props.width,
            height: this.props.height
        }, this.props.style);

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}