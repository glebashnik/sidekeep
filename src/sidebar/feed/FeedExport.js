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
                marginTop: 30
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.text}>
                    Download collected information as a Word document. Click Export button and wait for download to start.
                </div>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Export" onClick={Actions.exportToWord}/>
                    <RaisedButton style={styles.button} label="Close" onClick={Actions.toggleFeedMenu}/>
                </div>
            </div>
        );
    }
}