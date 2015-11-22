import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import copy from 'copy-to-clipboard';

export default class FeedShare extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    state = {
        url: 'https://aftersearch.firebaseapp.com/join.html?feed=' + encodeURIComponent(this.props.feed.id)
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
                    Collect information together with your friends.
                    Copy this link and send it to them in email or chat.
                </div>
                <TextField
                    disabled={true}
                    defaultValue={this.state.url}/>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Copy link" onClick={this.copy}/>
                    <RaisedButton style={styles.button} label="Close" onClick={this.props.onClose}/>
                </div>
            </div>
        );
    }
}