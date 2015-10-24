import React from 'react';
import FloatingBox from './FloatingBox';
import IconButton from 'material-ui/lib/icon-button';
import AddBox from 'material-ui/lib/svg-icons/content/add-box.js';
import AddIcon from '../sidebar/js/components/icons/AddIcon';

export default class FloatingButton extends React.Component {
    static propTypes = {
        top: React.PropTypes.number.isRequired,
        left: React.PropTypes.number.isRequired,
        above: React.PropTypes.bool,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        above: true
    };

    render() {
        var padding = 2;
        var border = 1;

        var width = 24 + 2 * (padding + border);
        var height = 24 + 2 * (padding + border);

        // Position centered above/below the desired position
        var top = this.props.above ? this.props.top - height : this.props.top;
        var left = this.props.left - width / 2;

        var style = {
            padding: padding,
            border: border + 'px solid black',
            background: 'white'
        };

        return (
            <FloatingBox top={top} left={left} width={width} height={height} style={{ zIndex: 2000000000 }}>
                <div style={style}>
                    <IconButton>AddBox</IconButton>
                </div>
            </FloatingBox>
        );

    }
}
