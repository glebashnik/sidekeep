import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import FolderIcon from 'material-ui/lib/svg-icons/file/folder';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import Colors from 'material-ui/lib/styles/colors';

export default class PostMenu extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    removePost = () => {
        Actions.removePost(this.props.post.id);
    };

    render() {
        const styles = {
            icon: {
                color: Colors.grey500
            },
            item: {
                fontSize: 14,
                paddingLeft: 60,
                paddingRight: 10
            }
        };

        return (
            <IconMenu
                iconButtonElement={
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={styles.icon}>
                        more_vert
                    </IconButton>}>
                <MenuItem
                    primaryText="Move to Topic"
                    innerDivStyle={styles.item}
                    leftIcon={<FolderIcon/>}/>
                <MenuItem
                    primaryText="Delete Post"
                    onClick={this.removePost}
                    innerDivStyle={styles.item}
                    leftIcon={<DeleteIcon/>}/>
            </IconMenu>
        );
    }
}