import _ from 'lodash';
import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';

import LogoIcon from './icons/LogoIcon';
import Theme from './Theme';
import FeedMenu from './feed/FeedMenu';
import Actions from '../shared/Actions';

export default class Toolbar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feeds: React.PropTypes.object.isRequired
    };

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
                zIndex: 7,
                width: '100%',
                background: Theme.palette.accentBackground,
                alignItems: 'center'
            },
            icon: {
                color: Colors.darkWhite
            },
            title: {
                display: 'flex',
                flexGrow: 1,
                cursor: 'pointer',
                alignItems: 'center',
                font: '400 16px Roboto',
                color: Colors.grey50
            }
        };

        const id = this.props.user.selectedFeed;
        const name = id ? this.props.feeds[id].name : '';

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
                        tooltip="Menu">
                        menu
                    </IconButton>
                    <div style={styles.title} onClick={Actions.toggleFeedMenu}>{name}</div>
                    <IconButton
                        onClick={Actions.toggleSidebar}
                        iconClassName="material-icons"
                        iconStyle={styles.icon}
                        tooltip="Hide">
                        close
                    </IconButton>
                </div>
                {feedMenuElem}
            </div>

        );
    }
}