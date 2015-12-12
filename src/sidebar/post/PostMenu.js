import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FolderIcon from 'material-ui/lib/svg-icons/file/folder';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import FontIcon from 'material-ui/lib/font-icon';

import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class PostMenu extends React.Component {
    static propTypes = {
        background: React.PropTypes.string,
        post: React.PropTypes.object.isRequired
    };

    move = () => {
        Actions.movePost(this.props.post.id)
    };

    remove = () => {
        Actions.removePost(this.props.post.id);
    };

    isOpen = () => {
        return this.refs.menu.isOpen();
    };

    render() {
        const styles = {
            container: {
                zIndex: 10,
                position: 'absolute',
                right: 0,
                background: this.props.background
            },
            icon: {
                padding: 5,
                color: Theme.palette.iconDark
            }
        };

        return (
            <IconMenu ref="menu"
                      style={styles.container}
                      anchorOrigin={{horizontal:'right', vertical:'top'}}
                      targetOrigin={{horizontal:'right', vertical:'top'}}
                      iconButtonElement={
                        <FontIcon
                            style={styles.icon}
                            className="material-icons">
                            expand_more
                        </FontIcon>}>
                <MenuItem onClick={this.move} leftIcon={<FolderIcon/>} primaryText="Copy to..."/>
                <MenuItem onClick={this.remove} leftIcon={<DeleteIcon/>} primaryText="Delete"/>
            </IconMenu>
        );
    }
}