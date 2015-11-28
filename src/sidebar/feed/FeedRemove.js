import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';

export default class FeedRemove extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    remove = () => {
        Actions.removeFeed(this.props.feed.id);
        this.props.onClose();
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
                marginTop: 40
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.text}>Everything collected in this topic will be lost. Do you want to proceed?</div>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Delete" onClick={this.remove}/>
                    <RaisedButton style={styles.button} label="Cancel" onClick={this.props.onClose}/>
                </div>
            </div>
        );
    }
}