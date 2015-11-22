import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Colors from 'material-ui/lib/styles/colors';

import Actions from '../../shared/Actions';

export default class FeedAdd extends React.Component {
    addFeed = () => {
        const nameField = this.refs.nameField;
        const name = nameField.getValue();

        if (name) {
            Actions.addFeed(name);
            nameField.setValue('');
        }
    };

    render() {
        const style = {
            display: 'flex',
            alignItems: 'center',
            padding: '0 25px 0 0'
        };

        return (
            <div style={style}>
                <IconButton onClick={this.addFeed}>
                    <AddIcon color={Colors.grey600}/>
                </IconButton>
                <TextField ref="nameField" hintText="Add a topic" onEnterKeyDown={this.addFeed}/>
            </div>
        );
    }
}