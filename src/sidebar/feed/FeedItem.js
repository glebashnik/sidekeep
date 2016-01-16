import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class FeedItem extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired
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

    select = () => {
        Actions.selectFeed(this.props.feed.id);
        Actions.toggleMenu();
    };

    render() {
        const style = {
            position: 'relative',
            padding: 15,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            font: Theme.font.topic,
            cursor: 'pointer',
            color: Theme.palette.textDark
        };

        if (this.state.hover)
            style.background = Theme.palette.backgroundHover;
        if (this.props.feed.selected)
            style.background = Theme.palette.backgroundSelect;

        return (
            <div style={style}
                 onMouseEnter={this.enter}
                 onMouseLeave={this.leave}
                 onClick={this.select}>
                {this.props.feed.name}
            </div>
        );
    }
}