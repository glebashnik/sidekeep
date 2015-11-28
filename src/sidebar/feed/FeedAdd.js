import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';

export default class FeedAdd extends React.Component {
    static propTypes = {
        onClose: React.PropTypes.func.isRequired
    };

    isValid = () => {
        return this.refs.name.getValue().trim().length > 0;
    };

    save = () => {
        const nameField = this.refs.name;

        if (this.isValid()) {
            Actions.addFeed(nameField.getValue());
            nameField.clearValue();
            this.props.onClose();
        } else
            nameField.setErrorText("Topic name can't be empty");
    };

    cancel = () => {
        this.props.onClose();
    };

    change = (e) => {
        e.stopPropagation();
        if (this.isValid())
            this.refs.name.setErrorText('');
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
                marginTop: 40
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <TextField
                    onChange={this.change}
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