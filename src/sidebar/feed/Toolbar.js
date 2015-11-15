import _ from 'lodash';
import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import FeedMenu from './FeedMenu';
import ExportMenu from './ExportMenu';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import FolderMoveIcon from '../ui/FolderMoveIcon'
import FolderPlusIcon from '../ui/FolderPlusIcon'
import BookmarkPlusIcon from '../ui/BookmarkPlusIcon'

export default class Toolbar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    toggleFeedMenu = () => {
        Actions.toggleFeedMenu();
    };

    bookmarkPage = () => {
        Actions.clipPage();
    };

    deletePost = () => {
        Actions.removePost(this.props.ui.selectedPostId);
    };

    hideSidebar = () => {
        Actions.toggleSidebar();
    };

    render() {
        const styles = {
            bar: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                zIndex: 5
            },
            feedTools: {
                display: 'flex',
                width: '100%',
                background: Theme.palette.accentBackground,
                alignItems: 'center',
                zIndex: 6
            },
            postTools: {
                display: 'flex',
                width: '100%',
                background: '#6AB1E6'
            },
            postToolsRight: {
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
            },
            icon: {
                color: '#E8F3FA'
            },
            title: {
                display: 'flex',
                flexGrow: 1,
                cursor: 'pointer',
                alignItems: 'center',
                paddingBottom: 3,
                borderBottom: '1px solid ' + Colors.lightWhite
            },
            titleText: {
                flexGrow: 1,
                font: '400 17px Roboto',
                color: Theme.palette.accentForeground
            },
            selectedText: {
                font: '400 16px Roboto',
                color: Theme.palette.accentForeground,
                marginRight: 15
            },
            collectedText: {
                font: '400 16px Roboto',
                color: Theme.palette.accentForeground,
                marginRight: 23
            }
        };

        let feedMenu;
        if (this.props.ui.feedMenu)
            feedMenu = <FeedMenu user={this.props.user}/>;

        const postToolsRight = this.props.ui.selectedPostId ?
            <div style={styles.postToolsRight}>
                <div style={styles.selectedText}>1 item selected</div>
                <IconButton
                    iconStyle={styles.icon}
                    touch={true}
                    tooltip="Move to...">
                    <FolderMoveIcon color={styles.icon.color}/>
                </IconButton>
                <IconButton
                    onClick={this.deletePost}
                    iconStyle={styles.icon}
                    iconClassName="material-icons"
                    tooltipPosition="bottom-left"
                    touch={true}
                    tooltip="Delete">
                    delete
                </IconButton>
            </div> :
            <div style={styles.postToolsRight}>
                <div style={styles.collectedText}>5 items collected</div>
            </div>;


        return (
            <div style={styles.bar}>
                <div style={styles.feedTools}>
                    <IconButton
                        onClick={this.hideSidebar}
                        iconStyle={styles.icon}
                        iconClassName="material-icons"
                        tooltipPosition="bottom-right"
                        touch={true}
                        tooltip="Hide sidebar">
                        chevron_right
                    </IconButton>
                    <div style={styles.title} onClick={this.toggleFeedMenu}>
                        <div style={styles.titleText}>
                            {this.props.feed.name}
                        </div>
                        <FontIcon
                            className="material-icons"
                            color={Colors.lightWhite}>
                            arrow_drop_down
                        </FontIcon>
                    </div>
                    <ExportMenu user={this.props.user}/>
                </div>
                <div style={styles.postTools}>
                    <IconButton
                        onClick={this.bookmarkPage}
                        touch={true}
                        tooltipPosition="bottom-right"
                        tooltip="Add bookmark">
                        <BookmarkPlusIcon color={styles.icon.color}/>
                    </IconButton>
                    {postToolsRight}
                </div>
                {feedMenu}
            </div>

        );
    }
}