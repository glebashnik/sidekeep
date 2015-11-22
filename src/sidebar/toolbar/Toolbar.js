import _ from 'lodash';
import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';

import Theme from '../Theme';
import FeedMenu from './FeedMenu';
import Actions from '../../shared/Actions';

export default class Toolbar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feeds: React.PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const feed = nextProps.feeds[nextProps.user.selectedFeed];

        if (feed)
            this.refs.name.setValue(feed.name);
    }

    renameFeed = (e) => {
        Actions.renameFeed(this.props.user.selectedFeed, e.target.value);
        e.target.blur();
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                zIndex: 5,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            content: {
                display: 'flex',
                width: '100%',
                background: Theme.palette.accentBackground,
                alignItems: 'center'
            },
            icon: {
                color: 'white'
            },
            titleField: {
                flexGrow: 1
            },
            titleInput: {
                font: '400 17px Roboto',
                color: Theme.palette.accentForeground
            }
        };

        const feedMenuElem = this.props.ui.feedMenu
            ? <FeedMenu feeds={this.props.feeds}/>
            : undefined;

        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <IconButton
                        onClick={Actions.toggleFeedMenu}
                        iconClassName="material-icons"
                        iconStyle={styles.icon}
                        tooltipPosition="bottom-right"
                        touch={true}
                        tooltip="Topics">
                        folder
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
                    <IconButton
                        onClick={Actions.toggleSidebar}
                        iconClassName="material-icons"
                        iconStyle={styles.icon}
                        tooltipPosition="bottom-left"
                        touch={true}
                        tooltip="Hide sidebar">
                        close
                    </IconButton>
                </div>
                {feedMenuElem}
            </div>

        );
    }
}