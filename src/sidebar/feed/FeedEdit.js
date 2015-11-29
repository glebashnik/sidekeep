import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';

export default class FeedEdit extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object
    };

    isValid = () => {
        return this.refs.name.getValue().trim().length > 0;
    };

    save = () => {
        const nameField = this.refs.name;

        if (this.isValid()) {
            if (this.props.feed)
                Actions.renameFeed(this.props.feed.id, nameField.getValue());
            else
                Actions.addFeed(nameField.getValue());

            Actions.toggleFeedMenu();
        } else
            nameField.setErrorText("Topic name can't be empty");
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

        const textLabel = this.props.feed ? 'Change topic name' : 'New topic name';
        const buttonLabel = this.props.feed ? 'Save' : 'Add';
        const textDefault = this.props.feed ? this.props.feed.name : '';

        return (
            <div style={styles.container}>
                <TextField
                    onChange={this.change}
                    onEnterKeyDown={this.save}
                    floatingLabelText={textLabel}
                    defaultValue={textDefault}
                    ref="name"/>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label={buttonLabel} onClick={this.save}/>
                    <RaisedButton style={styles.button} label="Cancel" onClick={Actions.toggleFeedMenu}/>
                </div>
            </div>
        );
    }
}
