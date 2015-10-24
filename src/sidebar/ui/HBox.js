import React from 'react';
let PropTypes = React.PropTypes;
import Radium from 'radium';

@Radium class HBox extends React.Component {
    static propTypes = {
        style: PropTypes.object
    };

    render() {
        let style = {
            display: 'flex',
            flexDirection: 'row'
        };

        return (
            <div style={[style, this.props.style]}>
                {this.props.children}
            </div>
        );
    }
}

export default HBox;