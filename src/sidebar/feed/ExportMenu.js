import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import WordIcon from '../ui/WordIcon';
import PowerPointIcon from '../ui/PowerPointIcon';
import Actions from '../../shared/Actions';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import copy from 'copy-to-clipboard';

export default class ExportMenu extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    };

    exportToDocx = () => {
        Actions.exportToDocx();
    };

    exportToPptx = () => {
        Actions.exportToPptx();
    };

    copyLink = () => {
        const feedId = encodeURIComponent(this.props.user.selectedFeed);
        copy(`https://aftersearch.firebaseapp.com/join.html?feed=${feedId}`);
    };

    render() {
        const styles = {
            menu: {
                zIndex: 6
            },
            icon: {
                color: 'white'
            },
            item: {
                fontSize: 14
            }
        };

        return (
            <IconMenu
                ref="menu"
                style={styles.menu}
                iconButtonElement={
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={styles.icon}>
                        more_vert
                    </IconButton>}>
                <MenuItem
                    primaryText="Share by link"
                    onClick={this.copyLink}
                    style={styles.item}
                    leftIcon={<ShareIcon/>}/>
                <MenuItem
                    primaryText="Export to Word"
                    onClick={this.exportToDocx}
                    style={styles.item}
                    leftIcon={<WordIcon/>}/>
                <MenuItem
                    primaryText="Export to PowerPoint"
                    onClick={this.exportToPptx}
                    style={styles.item}
                    leftIcon={<PowerPointIcon/>}/>
            </IconMenu>
        );
    }
}