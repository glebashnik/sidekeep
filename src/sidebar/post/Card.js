import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';
import Post from './Post';

import moment from 'moment';

export default class Card extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        post: React.PropTypes.object.isRequired
    };

    render() {
        let styles = {
            card: {
                background: Colors.grey50,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            time: {
                padding: '15px 15px 5px 15px',
                font: '400 14px Roboto',
                color: Colors.grey600
            }
        };

        return (
            <div>
                <div style={styles.time}>{moment(this.props.post.timestamp).fromNow()}</div>
                <div style={styles.card}><Post user={this.props.user} post={this.props.post} borderless/></div>
            </div>
        );
    }
}