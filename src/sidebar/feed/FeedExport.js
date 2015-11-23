import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';

export default class FeedExport extends React.Component {
    static propTypes = {
        onClose: React.PropTypes.func.isRequired
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
                    Export collected information to a Word document.
                </div>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Export" onClick={Actions.exportToWord}/>
                    <RaisedButton style={styles.button} label="Close" onClick={this.props.onClose}/>
                </div>
            </div>
        );
    }
}