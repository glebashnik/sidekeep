import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

import Actions from '../../shared/Actions';

export default class EditFeed extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired
    };

    state = {
        checkedDelete: false
    };

    isValid = () => {
        return this.refs.name.getValue().trim().length > 0;
    };

    saveFeed = () => {
        const nameField = this.refs.name;

        if (this.isValid()) {
            Actions.renameFeed(this.props.feed.id, nameField.getValue());
            Actions.toggleFeedMenu();
        } else
            nameField.setErrorText("Topic name can't be empty");
    };

    deleteFeed = () => {
        Actions.removeFeed(this.props.feed.id);
        Actions.changeTab('list');
    };

    accept = () => {
        if (this.state.checkedDelete)
            this.deleteFeed();
        else
            this.saveFeed();
    };

    changeName = (e) => {
        e.stopPropagation();

        if (this.isValid())
            this.refs.name.setErrorText('');
    };

    checkDelete = (e, checked) => {
        this.setState({checkedDelete: checked});
    };

    render() {
        const styles = {
            container: {
                padding: '0 20px 20px 20px',
                display: 'flex',
                flexDirection: 'column'
            },
            deleteCheckbox: {
                marginTop: 20,
                fontSize: 16
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

        const buttonLabel = this.state.checkedDelete ? 'Delete' : 'Save';

        const checkbox = this.props.feed
            ? <Checkbox
                label="Delete this topic"
                style={styles.deleteCheckbox}
                onCheck={this.checkDelete}
                defaultChecked={this.state.checkedDelete}/>
            : null;

        return (
            <div style={styles.container}>
                <TextField
                    onChange={this.changeName}
                    onEnterKeyDown={this.saveFeed}
                    floatingLabelText="Change topic name"
                    defaultValue={this.props.feed.name}
                    ref="name"/>

                {checkbox}

                <div style={styles.buttons}>
                    <RaisedButton
                        style={styles.button}
                        primary={this.state.checkedDelete}
                        label={buttonLabel}
                        onClick={this.accept}/>
                    <RaisedButton
                        style={styles.button}
                        label="Cancel"
                        onClick={Actions.toggleFeedMenu}/>
                </div>
            </div>
        );
    }
}
