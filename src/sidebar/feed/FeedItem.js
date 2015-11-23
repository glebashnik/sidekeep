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
        Actions.toggleFeedMenu();
    };

    toggleTools = (e) => {
        if (e) {
            e.stopPropagation();
            Actions.selectFeed(this.props.feed.id);
        }

        this.setState({tools: !this.state.tools});
    };

    render() {
        const style = {
            position: 'relative',
            padding: '15px 20px 15px 20px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            font: '400 16px Roboto',
            cursor: 'pointer',
            color: Colors.darkBlack
        };

        if (this.state.hover)
            style.background = Theme.palette.hoverBackground;
        if (this.props.feed.selected)
            style.background = Theme.palette.selectBackground;

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