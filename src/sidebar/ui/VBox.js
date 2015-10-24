import React from 'react';
import Radium from 'radium';

@Radium class VBox extends React.Component {
    static propTypes = {
        style: React.PropTypes.object
    };

    render() {
        let style = {
            display: 'flex',
            flexDirection: 'column'
        };

        return (
            <div style={[style, this.props.style]}>
                {this.props.children}
            </div>
        );
    }
}

export default VBox;