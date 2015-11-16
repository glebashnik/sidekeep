import _ from 'lodash';
import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Overlay from 'material-ui/lib/overlay';
import FolderMoveIcon from '../ui/FolderMoveIcon'

import WordIcon from '../ui/WordIcon';
import LinkIcon from 'material-ui/lib/svg-icons/editor/insert-link';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

import copy from 'copy-to-clipboard';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class ActionsMenu extends React.Component {
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

    renameFeed = () => {
        const newName = this.refs.name.getValue();

        if (this.props.feed.name !== newName)
            Actions.renameFeed(this.props.user.selectedFeed, newName);
    };

    close = () => {
        this.renameFeed();
        Actions.toggleActionsMenu();
    };

    exportToWord = () => {
        Actions.exportToWord();
        this.close();
    };

    copyLink = () => {
        const feedId = encodeURIComponent(this.props.user.selectedFeed);
        copy(`https://aftersearch.firebaseapp.com/join.html?feed=${feedId}`);
        this.close();
    };

    deleteFeed = () => {
        Actions.removeFeed(this.props.user.selectedFeed);
        this.close();
    };

    deletePost = () => {
        Actions.removePost(this.props.ui.selectedPostId);
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
                zIndex: 10
            },
            list: {
                background: Theme.palette.background
            },
            nameItem: {
                marginTop: -10,
                padding: '0 20px 10px 20px'
            },
            overlay: {
                position: 'absolute'
            }
        };

        const selectedList = this.props.ui.selectedPostId ?
            <List style={styles.list} subheader="Selected posts">
                <ListItem leftIcon={<FolderMoveIcon/>} primaryText="Move to topic"/>
                <ListItem leftIcon={<DeleteIcon/>} primaryText="Remove post" onClick={this.deletePost}/>
            </List> : undefined;

        return (
            <div style={styles.container}>
                <div style={styles.menu}>
                    <List style={styles.list} subheader="Selected topic">
                        <ListItem
                            disabled
                            style={styles.nameItem}
                            primaryText={
                                <TextField
                                    style={{width: 230}}
                                    ref="name"
                                    floatingLabelText="Edit topic name"
                                    onEnterKeyDown={this.renameFeed}/>}/>
                        <ListItem leftIcon={<LinkIcon/>} primaryText="Copy & share the link" onClick={this.copyLink}/>
                        <ListItem leftIcon={<WordIcon/>} primaryText="Export to Word" onClick={this.exportToWord}/>
                        <ListItem leftIcon={<DeleteIcon/>} primaryText="Remove topic" onClick={this.deleteFeed}/>
                    </List>
                    {selectedList}
                </div>
                <Overlay style={styles.overlay} onClick={this.close} show/>
            </div>
        );
    }
}
