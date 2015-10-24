import React from 'react';
import Theme from './Theme';
import md5 from 'md5';
import jdenticon from 'jdenticon';

function getSvg(name) {
    return name ? jdenticon.toSvg(md5(name), 30, 0) : ''
}

export default class Avatar extends React.Component {
    state = {svg: getSvg(this.props.name)};

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        style: React.PropTypes.object
    };

    componentWillReceiveProps(nextProps) {
        let name = nextProps.name;
        if (name !== this.props.name)
            this.setState({svg: getSvg(name)});
    }

    render() {
        var style = Object.assign({
            height: 30,
            width: 30,
            background: 'white',
            border: '1px solid ' + Theme.palette.accent2Color,
            overflow: 'hidden',
            borderRadius: '50%'
        }, this.props.style);

        return <div style={style} dangerouslySetInnerHTML={{__html: this.state.svg}}/>;
    }
}
