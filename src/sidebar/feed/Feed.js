import React from 'react';
import Post from './Post';
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from '../ui/CircularProgress';
import WordIcon from '../ui/WordIcon';
import PowerPointIcon from '../ui/PowerPointIcon';
import Actions from '../../shared/Actions';
import TextField from 'material-ui/lib/text-field';
import FeedMenu from './FeedMenu';
import GroupAdd from 'material-ui/lib/svg-icons/social/group-add';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import copy from 'copy-to-clipboard';
import Snackbar from 'material-ui/lib/snackbar';

export default class Feed extends React.Component {
    state = {
        assisting: false,
        feedMenu: false
    };

    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    exit = () => {
        Actions.exitFeed();
    };

    close = () => {
        Actions.toggleSidebar();
    };

    exportToDocx = () => {
        Actions.exportToDocx();
    };

    exportToPptx = () => {
        Actions.exportToPptx();
    };

    closeMenu = () => {
        this.refs.menu.close();
    };

    assist = () => {
        this.setState({assisting: true});
        setTimeout(() => {
            this.setState({assisting: false});
            Actions.assist();
        }, 3000);
    };

    toggleFeedMenu = () => {
        Actions.toggleFeedMenu();
    };

    toggleShareMenu = () => {
        Actions.toggleShareMenu();
    };

    copyLink = () => {
        const feedId = encodeURIComponent(this.props.user.selectedFeed);
        copy(`https://aftersearch.firebaseapp.com/join.html?feed=${feedId}`);
    };

    render() {
        const styles = {
            feed: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%'
            },
            title: {
                font: '400 17px Roboto',
                color: 'white',
                marginTop: 14,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 130
            },
            posts: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                flexGrow: 1,
                paddingBottom: 10
            },
            right: {
                display: 'flex',
                alignItems: 'center'
            },
            progress: {
                margin: 0,
                padding: 0
            },
            icon: {
                color: 'white'
            },
            menuItem: {
                fontSize: 14
            }
        };

        let assistant = (
            <IconButton
                iconClassName="material-icons"
                iconStyle={styles.icon}
                onClick={this.assist}
                touch={true}
                tooltipPosition="bottom-center"
                tooltip="Recommend">
                face
            </IconButton>
        );

        if (this.state.assisting)
            assistant = (
                <CircularProgress mode="indeterminate"
                                  color="white"
                                  innerStyle={styles.progress}/>
            );

        assistant = undefined;

        let feedMenu;
        if (this.props.ui.feedMenu)
            feedMenu = <FeedMenu user={this.props.user}/>;

        let shareMenu;
        if (this.props.ui.shareMenu)
            feedMenu = <ShareMenu feed={this.props.feed}/>;

        return (
            <div style={styles.feed}>
                <AppBar title={
                            <div style={styles.title}>{this.props.feed.name}</div>
                        }
                        iconElementLeft={
                            <IconButton
                                iconClassName="material-icons"
                                onClick={this.toggleFeedMenu}
                                touch={true}
                                tooltipPosition="bottom-right"
                                tooltip="Topics">
                                folder_open
                            </IconButton>
                        }
                        iconElementRight={
                            <div style={styles.right}>
                                {assistant}
                                 <IconButton
                                    onClick={this.copyLink}
                                    touch={true}
                                    tooltipPosition="bottom-center"
                                    tooltip="Copy Link">
                                    <ShareIcon color="white"/>
                                </IconButton>
                                <IconMenu
                                    ref="menu"
                                    iconButtonElement={
                                        <IconButton
                                            iconClassName="material-icons"
                                            iconStyle={styles.icon}>
                                            more_vert
                                        </IconButton>
                                    }>
                                    <MenuItem primaryText="Export to Word" onClick={this.exportToDocx} style={styles.menuItem} leftIcon={<WordIcon/>}/>
                                    <MenuItem primaryText="Export to PowerPoint" onClick={this.exportToPptx} style={styles.menuItem} leftIcon={<PowerPointIcon/>}/>
                                    <MenuItem primaryText="Exit Feed" onClick={this.exit} style={styles.menuItem} leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}/>
                                </IconMenu>
                            </div>
                        }/>
                {feedMenu}
                <div style={styles.posts}>
                    {this.props.feed.posts.map((post, index) => <Post post={post} key={index}/>)}
                </div>
            </div>
        );
    }
}