import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class NewFeed extends React.Component {

    isValid = () => {
        return this.refs.name.getValue().trim().length > 0;
    };

    addFeed = () => {
        const name = this.refs.name.getValue().trim();

        if (name.length > 0) {
            Actions.addFeed(name);
            Actions.toggleFeedMenu();
        }
    };

    render() {
        const style = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5
        };

        return (
            <div style={style}>
                <IconButton onClick={this.addFeed}>
                    <FontIcon color={Colors.grey600} className="material-icons">add</FontIcon>
                </IconButton>
                <TextField
                    style={{width: 230}}
                    onEnterKeyDown={this.addFeed}
                    hintText='New topic name'
                    ref="name"/>
            </div>
        );
    }
}