import _ from 'lodash';
import React from 'react';

import Colors from 'material-ui/lib/styles/colors';

import FeedAdd from './FeedAdd';
import FeedItem from './FeedItem';

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
                zIndex: 5,
                width: '100%',
                bottom: 0,
                top: 48
            },
            content: {
                width: '100%',
                zIndex: 10,
                background: 'white',
                overflowY: 'auto'
            },
            overlay: {
                flexGrow: 1,
                background: Colors.lightBlack
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <FeedAdd/>
                    {_.map(this.props.feeds, (feed, id) => <FeedItem key={id} feed={feed}/>)}
                </div>
                <div style={styles.overlay} onClick={Actions.toggleFeedMenu}/>
            </div>
        );
    }
}