import _ from 'lodash';
import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Overlay from 'material-ui/lib/overlay';

import WordIcon from '../ui/WordIcon';
import LinkIcon from 'material-ui/lib/svg-icons/editor/insert-link';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

import copy from 'copy-to-clipboard';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class TopicSettings extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        if (this.props.feed.name)
            this.refs.name.setValue(this.props.feed.name);
        else
            this.refs.name.focus();
    };

    componentWillReceiveProps(nextProps) {
        this.refs.name.setValue(nextProps.feed.name);
    };

    rename = () => {
        const newName = this.refs.name.getValue();

        if (this.props.feed.name !== newName)
            Actions.renameFeed(this.props.user.selectedFeed, newName);
    };

    close = () => {
        this.rename();
        Actions.closeTopicSettings();
    };

    export = () => {
        Actions.exportToDocx();
        this.close();
    };

    copyLink = () => {
        const feedId = encodeURIComponent(this.props.user.selectedFeed);
        copy(`https://aftersearch.firebaseapp.com/join.html?feed=${feedId}`);
        this.close();
    };

    remove = () => {
        Actions.removeFeed(this.props.user.selectedFeed);
        this.close();
    };

    render() {
        const styles = {
            container: {
                position: 'absolute',
                zIndex: 5,
                width: '100%',
                top: 48,
                bottom: 0
            },
            menu: {
                position: 'absolute',
                width: '100%',
                zIndex: 10,
                background: Theme.palette.background
            },
            nameItem: {
                margin: 0,
                padding: '0 20px 10px 20px'
            },
            overlay: {
                position: 'absolute'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.menu}>
                    <ListItem
                        disabled
                        style={styles.nameItem}
                        primaryText={
                        <TextField
                            style={{width: 250}}
                            ref="name"
                            floatingLabelText="Topic name"
                            onEnterKeyDown={this.rename}/>}/>
                    <ListItem leftIcon={<LinkIcon/>} primaryText="Copy & share the link" onClick={this.copyLink}/>
                    <ListItem leftIcon={<WordIcon/>} primaryText="Export to Word" onClick={this.export}/>
                    <ListItem leftIcon={<DeleteIcon/>} primaryText="Remove topic" onClick={this.remove}/>
                    <ListItem primaryText="Close" onClick={this.close}/>
                </div>
                <Overlay style={styles.overlay} onClick={this.close} show/>
            </div>
        );
    }
}
