import React from 'react';

import IconMenu from '../../../node_modules/material-ui/lib/menus/icon-menu';
import MenuItem from '../../../node_modules/material-ui/lib/menus/menu-item';
import FolderIcon from '../../../node_modules/material-ui/lib/svg-icons/file/folder';
import DeleteIcon from '../../../node_modules/material-ui/lib/svg-icons/action/delete';

import FloatingMenuButton from './FloatingMenuButton';
import Actions from '../../shared/Actions';

export default class PostMenu extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    stopPropagation = (e) => {
        e.stopPropagation();
    };

    move = (e) => {
        this.stopPropagation(e);
        //todo implement
    };

    remove = (e) => {
        this.stopPropagation(e);
        Actions.removePost(this.props.post.id);
    };

    render() {
        let style = {
            position: 'absolute',
            top: -20,
            right: 0,
            zIndex: 5
        };

        return (
            <IconMenu style={style} iconButtonElement={<FloatingMenuButton onClick={this.stopPropagation}/>}>
                <MenuItem onClick={this.move} leftIcon={<FolderIcon/>} primaryText="Move to..."/>
                <MenuItem onClick={this.remove} leftIcon={<DeleteIcon/>} primaryText="Remove"/>
            </IconMenu>
        );
    }
}