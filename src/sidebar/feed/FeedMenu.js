import _ from 'lodash';
import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import FeedItem from './FeedItem';
import FeedTools from './FeedTools';
import Actions from '../../shared/Actions';

export default class FeedMenu extends React.Component {
    static propTypes = {
        feeds: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            container: {
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                bottom: 0,
                top: 48
            },
            content: {
                width: '100%',
                background: Colors.grey50,
                overflowY: 'scroll',
                flexGrow: 1
            },
            overlay: {
                background: Colors.lightBlack
            }
        };

        const feed = _.find(this.props.feeds, {selected: true});

        return (
            <div style={styles.container}>
                <FeedTools feed={feed}/>
                <div style={styles.content}>
                    {_.map(this.props.feeds, (feed, id) => <FeedItem key={id} feed={feed}/>)}
                </div>
                <div style={styles.overlay} onClick={Actions.toggleFeedMenu}/>
            </div>
        );
    }
}