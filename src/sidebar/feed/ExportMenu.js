import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import WordIcon from '../ui/WordIcon';
import PowerPointIcon from '../ui/PowerPointIcon';
import Actions from '../../shared/Actions';

export default class ExportMenu {
    exportToDocx = () => {
        Actions.exportToDocx();
    };

    exportToPptx = () => {
        Actions.exportToPptx();
    };

    render() {
        const styles = {
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
                iconButtonElement={
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={styles.icon}>
                        more_vert
                    </IconButton>}>
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