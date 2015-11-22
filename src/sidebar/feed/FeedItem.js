import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import FeedTools from './FeedTools';

import Actions from '../../shared/Actions';

export default class FeedItem extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired
    };

    state = {
        hover: false,
        tools: false
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
        const styles = {
            container: {},
            content: {
                position: 'relative',
                padding: '15px 20px 15px 20px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                font: '400 16px Roboto',
                cursor: 'pointer',
                color: Colors.darkBlack
            },
            expand: {
                position: 'absolute',
                top: 0,
                right: 0
            },
            expandIcon: {
                color: Colors.grey600
            }
        };

        if (this.state.hover)
            styles.container.background = Theme.palette.hoverBackground;
        if (this.props.feed.selected)
            styles.container.background = Theme.palette.selectBackground;

        const expand = this.state.hover || this.props.feed.selected ?
            <IconButton
                style={styles.expand}
                iconStyle={styles.expandIcon}
                iconClassName="material-icons"
                onClick={this.toggleTools}>
                {this.state.tools ? 'expand_less' : 'expand_more'}
            </IconButton> : undefined;

        const tools = this.state.tools && this.props.feed.selected
            ? <FeedTools feed={this.props.feed} onClose={this.toggleTools}/> : undefined;

        return (
            <div style={styles.container}>
                <div style={styles.content}
                     onMouseEnter={this.enter}
                     onMouseLeave={this.leave}
                     onClick={this.select}>
                    {this.props.feed.name}
                    {expand}
                </div>
                {tools}
            </div>
        );
    }
}