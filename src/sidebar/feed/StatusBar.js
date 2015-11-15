import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import FolderMoveIcon from '../ui/FolderMoveIcon'
import Theme from '../Theme';
import Actions from '../../shared/Actions';

export default class StatusBar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    deletePost = () => {
        Actions.removePost(this.props.ui.selectedPostId);
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                background: Theme.palette.accentBackground,
                zIndex: 5
            },
            icon: {
                color: '#E8F3FA'
            },
            text: {
                font: '400 16px Roboto',
                color: Theme.palette.accentForeground,
                padding: 15
            }
        };

        return this.props.ui.selectedPostId ?
            <div style={styles.container}>
                <div style={styles.text}>1 item selected</div>
                <IconButton
                    iconStyle={styles.icon}
                    touch={true}
                    tooltipPosition="top-center"
                    tooltip="Move to topic">
                    <FolderMoveIcon color={styles.icon.color}/>
                </IconButton>
                <IconButton
                    onClick={this.deletePost}
                    iconStyle={styles.icon}
                    iconClassName="material-icons"
                    tooltipPosition="top-left"
                    touch={true}
                    tooltip="Delete">
                    delete
                </IconButton>
            </div> :
            <div style={styles.container}>
                <div style={styles.text}>5 items collected</div>
            </div>;
    }
}