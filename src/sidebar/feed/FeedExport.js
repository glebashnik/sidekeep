import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';

export default class FeedExport extends React.Component {
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
                <div style={styles.text}>
                    Export collected information to a document.
                </div>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Google Doc" onClick={Actions.exportToGoogleDoc}/>
                    <RaisedButton style={styles.button} label="Word" onClick={Actions.exportToWord}/>
                </div>
            </div>
        );
    }
}