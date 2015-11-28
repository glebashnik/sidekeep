import React from 'react';

class VBox extends React.Component {
    static propTypes = {
        style: React.PropTypes.object
    };

    render() {
        let style = Object.assign({
            display: 'flex',
            flexDirection: 'column'
        }, this.props.style);

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}

export default VBox;