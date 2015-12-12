import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import moment from 'moment';

import Theme from '../Theme';
import Post from './Post';

export default class Card extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        post: React.PropTypes.object.isRequired
    };

    render() {
        let styles = {
            card: {
                background: Theme.palette.backgroundCard,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            time: {
                padding: '15px 15px 6px 10px',
                font: Theme.font.time,
                color: Theme.palette.time
            }
        };

        return (
            <div>
                <div style={styles.time}>{moment(this.props.post.timestamp).fromNow().toUpperCase()}</div>
                <div style={styles.card}><Post user={this.props.user} post={this.props.post}/></div>
            </div>
        );
    }
}