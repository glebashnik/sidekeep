import _ from 'lodash';
import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import FeedMenu from './FeedMenu';
import ActionsMenu from './ActionsMenu';
import Actions from '../../shared/Actions';
import TextField from 'material-ui/lib/text-field';

export default class Toolbar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        this.refs.name.setValue(nextProps.feed.name);
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
            ? <FeedMenu user={this.props.user}/>
            : undefined;

        const actionsMenuElem = this.props.ui.actionsMenu
            ? <ActionsMenu ui={this.props.ui} user={this.props.user} feed={this.props.feed}/>
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
                        onClick={Actions.toggleActionsMenu}
                        iconClassName="material-icons"
                        iconStyle={styles.icon}
                        tooltipPosition="bottom-left"
                        touch={true}
                        tooltip="Actions">
                        more_vert
                    </IconButton>
                </div>
                {feedMenuElem}
                {actionsMenuElem}
            </div>

        );
    }
}