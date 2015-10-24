import React from 'react';
let PropTypes = React.PropTypes;
import Radium from 'radium';

@Radium class Snippet extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        maxLines: PropTypes.number.isRequired,
        style: PropTypes.object
    };

    static defaultProps = {
        maxLines: 1
    };

    render() {
        let style = {
            display: '-webkit-box',
            overflow: 'hidden',
            wordWrap: 'break-word',
            WebkitLineClamp: this.props.maxLines,
            WebkitBoxOrient: 'vertical'
        };

        return <div style={[style, this.props.style]}>{this.props.text}</div>
    }
}

export default Snippet;