import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Post from './Post';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import copy from 'copy-to-clipboard';
import FeedMenu from './FeedMenu';
import ExportMenu from './ExportMenu';

export default class Feed extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    toggleFeedMenu = () => {
        Actions.toggleFeedMenu();
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
            }
        };

        let feedMenu;
        if (this.props.ui.feedMenu)
            feedMenu = <FeedMenu user={this.props.user}/>;

        return (
            <div style={styles.feed}>
                <AppBar
                    title={<div style={styles.title}>{this.props.feed.name}</div>}
                    iconElementLeft={
                        <IconButton
                            iconClassName="material-icons"
                            onClick={this.toggleFeedMenu}
                            touch={true}
                            tooltipPosition="bottom-right"
                            tooltip="Topics">
                            folder_open
                        </IconButton>}
                    iconElementRight={
                        <div style={styles.right}>
                            <IconButton
                                onClick={this.copyLink}
                                touch={true}
                                tooltipPosition="bottom-center"
                                tooltip="Copy Link">
                                <ShareIcon color="white"/>
                            </IconButton>
                            <ExportMenu/>
                        </div>}/>
                {feedMenu}
                <div style={styles.posts}>
                    {this.props.feed.posts.map((post, index) => <Post post={post} key={index}/>)}
                </div>
            </div>
        );
    }
}