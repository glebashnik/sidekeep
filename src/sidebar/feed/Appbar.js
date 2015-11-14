import _ from 'lodash';
import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import FeedMenu from './FeedMenu';
import ExportMenu from './ExportMenu';
import TextField from 'material-ui/lib/text-field';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';

export default class AppBar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        this.refs.name.setValue(nextProps.feed.name);
    }

    toggleFeedMenu = () => {
        Actions.toggleFeedMenu();
    };

    deletePost = () => {
        Actions.removePost(this.props.ui.selectedPostId);
    };

    renameFeed = (e) => {
        Actions.renameFeed(this.props.user.selectedFeed, e.target.value);
        e.target.blur();
    };

    render() {
        const styles = {
            bar: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            },
            row: {
                display: 'flex',
                width: '100%',
                background: Theme.palette.accentBackground
            },
            icon: {
                color: Theme.palette.accentForeground
            },
            titleField: {
                flex: '1'
            },
            titleInput: {
                font: '400 17px Roboto',
                color: Theme.palette.accentForeground
            },
            right: {
                display: 'flex',
                alignItems: 'center'
            }
        };

        let feedMenu;
        if (this.props.ui.feedMenu)
            feedMenu = <FeedMenu user={this.props.user}/>;

        const deleteButton = this.props.ui.selectedPostId ?
            <IconButton
                onClick={this.deletePost}
                iconStyle={styles.icon}
                iconClassName="material-icons"
                touch={true}
                tooltip="Delete">
                delete
            </IconButton> : undefined;

        return (
            <div style={styles.bar}>
                <div style={styles.row}>
                    <IconButton
                        iconStyle={styles.icon}
                        iconClassName="material-icons"
                        onClick={this.toggleFeedMenu}
                        touch={true}
                        tooltipPosition="bottom-right"
                        tooltip="Topics">
                        folder_open
                    </IconButton>
                    <TextField
                        style={styles.titleField}
                        inputStyle={styles.titleInput}
                        underlineStyle={{borderColor: Theme.palette.accentBackground}}
                        underlineFocusStyle={{borderColor: 'white'}}
                        hintText="Topic Name"
                        ref="name"
                        onBlur={this.renameFeed}
                        onEnterKeyDown={this.renameFeed}/>
                    <div style={styles.right}>
                        {deleteButton}
                        <ExportMenu user={this.props.user}/>
                    </div>
                </div>
                {feedMenu}
            </div>

        );
    }
}