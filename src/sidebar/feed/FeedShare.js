import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import copy from 'copy-to-clipboard';

import Actions from '../../shared/Actions';

export default class FeedShare extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired
    };

    state = {
        url: `https://aftersearch-dev.firebaseapp.com/join.html?id=${encodeURIComponent(this.props.feed.id)}&password=${encodeURIComponent(this.props.feed.password)}`
    };

    copy = () => {
        copy(this.state.url);
    };

    render() {
        const styles = {
            container: {
                padding: 20,
                display: 'flex',
                flexDirection: 'column'
            },
            text: {
                fontSize: 14
            },
            buttons: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.text}>
                    Collaborate when searching and collecting information.
                    Copy this link and send it to your friends by email or chat.
                </div>
                <TextField
                    disabled={true}
                    defaultValue={this.state.url}/>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Copy link" onClick={this.copy}/>
                    <RaisedButton style={styles.button} label="Close" onClick={Actions.toggleFeedMenu}/>
                </div>
            </div>
        );
    }
}