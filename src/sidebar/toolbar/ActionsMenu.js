import _ from 'lodash';
import React from 'react';

import AddIcon from 'material-ui/lib/svg-icons/content/add';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Overlay from 'material-ui/lib/overlay';

import FolderMoveIcon from '../icons/FolderMoveIcon'
import DeleteIcon from '../../../node_modules/material-ui/lib/svg-icons/action/delete';
import WordIcon from '../icons/WordIcon';
import LinkIcon from '../../../node_modules/material-ui/lib/svg-icons/editor/insert-link';

import copy from 'copy-to-clipboard';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class ActionsMenu extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    };

    close = () => {
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

    removeFeed = () => {
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
                background: 'white'
            },
            nameItem: {
                marginTop: -10,
                padding: '0 20px 10px 20px'
            },
            overlay: {
                position: 'absolute'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.menu}>
                    <ListItem leftIcon={<LinkIcon/>} primaryText="Copy & share topic link" onClick={this.copyLink}/>
                    <ListItem leftIcon={<WordIcon/>} primaryText="Export to Word" onClick={this.exportToWord}/>
                    <ListItem leftIcon={<DeleteIcon/>} primaryText="Remove topic" onClick={this.removeFeed}/>
                </div>
                <Overlay style={styles.overlay} onClick={this.close} show/>
            </div>
        );
    }
}
