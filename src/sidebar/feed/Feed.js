import _ from 'lodash';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Post from './Post';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import FeedMenu from './FeedMenu';
import ExportMenu from './ExportMenu';
import TextField from 'material-ui/lib/text-field';
import Theme from '../Theme';

export default class Feed extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    state = {
        feedName: ''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            feedName: nextProps.feed.name
        });
    }

    toggleFeedMenu = () => {
        Actions.toggleFeedMenu();
    };

    onChangeFeedName = (e) => {
        this.setState({
            feedName: e.target.value
        });
    };

    onBlurFeedName = (e) => {
        Actions.renameFeed(this.props.user.selectedFeed, e.target.value);
    };

    onEnterKeyDownFeedName = (e) => {
        Actions.renameFeed(this.props.user.selectedFeed, e.target.value);
        e.target.blur();
    };

    render() {
        const styles = {
            feed: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%'
            },
            titleField: {
                width: 180
            },
            titleInput: {
                font: '400 17px Roboto',
                color: 'white'
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

        const posts = this.props.feed.children;
        let postElems;

        if (posts) {
            const sortedPosts = _.sortBy(posts, p => -p.timestamp);
            postElems = sortedPosts.map((post, index) => <Post post={post} key={index}/>);
        }

        return (
            <div style={styles.feed}>
                <AppBar
                    title={
                        <TextField
                            style={styles.titleField}
                            inputStyle={styles.titleInput}
                            underlineStyle={{borderColor: Theme.palette.primary1Color}}
                            underlineFocusStyle={{borderColor: 'white'}}
                            hintText="Topic Name"
                            value={this.state.feedName}
                            onChange={this.onChangeFeedName}
                            onBlur={this.onBlurFeedName}
                            onEnterKeyDown={this.onEnterKeyDownFeedName}/>}
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
                            <ExportMenu user={this.props.user}/>
                        </div>}/>
                {feedMenu}
                <div style={styles.posts}>
                    {postElems}
                </div>
            </div>
        );
    }
}