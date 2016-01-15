import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';
import DriveIcon from '../icons/DriveIcon';
import WordIcon from '../icons/WordIcon';

import Actions from '../../shared/Actions';

export default class FeedExport extends React.Component {
    static propTypes = {
        state: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            text: {
                padding: 20,
                fontSize: 14
            },
            buttons: {
                display: 'flex',
                justifyContent: 'center'
            },
            button: {
                margin: '10px 10px 20px 10px'
            },
            progress: {
                background: 'white'
            }
        };

        const isExporting = this.props.state.isExporting;
        const progress = isExporting
            ? <LinearProgress style={styles.progress} mode="indeterminate"/>
            : null;

        return (
            <div style={styles.container}>
                <div style={styles.text}>
                    Export collected information to a document.
                </div>
                <div style={styles.buttons}>
                    <RaisedButton
                        style={styles.button}
                        label="Google Doc"
                        onClick={Actions.exportToGoogleDoc}
                        disabled={isExporting}/>
                    <RaisedButton
                        style={styles.button}
                        label="MS Word"
                        onClick={Actions.exportToWord}
                        disabled={isExporting}/>
                </div>
                {progress}
            </div>
        );
    }
}