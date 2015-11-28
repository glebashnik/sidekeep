import React from 'react';
let PropTypes = React.PropTypes;

class HBox extends React.Component {
    static propTypes = {
        style: PropTypes.object
    };

    render() {
        let style = Object.assign({
            display: 'flex',
            flexDirection: 'row'
        }, this.props.style);

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}

export default HBox;