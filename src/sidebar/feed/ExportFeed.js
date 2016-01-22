import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';

import Actions from '../../shared/Actions';

export default class ExportFeed extends React.Component {
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
                flexDirection: 'column',
                alignItems: 'center'
            },
            button: {
                width: 180,
                marginBottom: 20
            },
            progress: {
                background: 'white'
            }
        };

        const exporting = this.props.state.ui.exporting;
        const progress = exporting ? <LinearProgress style={styles.progress} mode="indeterminate"/> : null;
        
        return (
            <div style={styles.container}>
                <div style={styles.text}>
                    Export collected information to a document or a presentation.
                </div>
                <div style={styles.buttons}>
                    <RaisedButton
                        style={styles.button}
                        label="Google Doc"
                        onClick={Actions.exportToGoogleDoc}
                        disabled={exporting}/>
                    <RaisedButton
                        style={styles.button}
                        label="MS Word"
                        onClick={Actions.exportToWord}
                        disabled={exporting}/>
                    <RaisedButton
                        style={styles.button}
                        label="MS PowerPoint"
                        onClick={Actions.exportToPowerPoint}
                        disabled={exporting}/>
                </div>
                {progress}
            </div>
        );
    }
}