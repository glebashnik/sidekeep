import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FolderIcon from 'material-ui/lib/svg-icons/file/folder';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class PostMenu extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
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
        const style = {
            position: 'absolute',
            right: 0,
            zIndex: 5
        };

        const mergedStyle = Object.assign({}, style, this.props.style);

        return (
            <IconMenu style={mergedStyle} iconButtonElement={
                <FontIcon
                    className="material-icons"
                    style={{padding: 5}}
                    color={Colors.grey600}
                    hoverColor={Theme.palette.primary1Color}
                    onClick={this.stopPropagation}>expand_more</FontIcon>}>
                <MenuItem onClick={this.move} leftIcon={<FolderIcon/>} primaryText="Move to..."/>
                <MenuItem onClick={this.remove} leftIcon={<DeleteIcon/>} primaryText="Remove"/>
            </IconMenu>
        );
    }
}