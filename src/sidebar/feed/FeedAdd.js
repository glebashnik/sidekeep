import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';

export default class FeedAdd extends React.Component {
    static propTypes = {
        onClose: React.PropTypes.func.isRequired
    };

    save = () => {
        const name = this.refs.name.getValue();

        if (name) {
            this.refs.name.setValue('');
            Actions.addFeed(name);
            this.props.onClose();
        }
    };

    cancel = () => {
        this.props.onClose();
    };

    stopPropagation = (e) => {
        e.stopPropagation();
    };

    render() {
        const styles = {
            container: {
                padding: '0 20px 20px 20px',
                display: 'flex',
                flexDirection: 'column'
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
                <TextField
                    onChange={this.stopPropagation}
                    floatingLabelText="New topic name"
                    ref="name"/>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Add" onClick={this.save}/>
                    <RaisedButton style={styles.button} label="Cancel" onClick={this.cancel}/>
                </div>
            </div>
        );
    }
}