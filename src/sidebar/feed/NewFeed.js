import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Actions from '../../shared/Actions';

export default class NewFeed extends React.Component {
    isValid = () => {
        return this.refs.name.getValue().trim().length > 0;
    };

    addFeed = () => {
        const name = this.refs.name.getValue().trim();

        if (name.length > 0) {
            Actions.addFeed(name);
            Actions.toggleMenu();
        }
    };

    keyDown = (event) => {
        if (event.key == 'Enter')
            this.addFeed();
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
                    <FontIcon color="#757575" className="material-icons">add</FontIcon>
                </IconButton>
                <TextField
                    style={{width: 230}}
                    onKeyDown={this.keyDown}
                    hintText='New topic name'
                    ref="name"/>
            </div>
        );
    }
}