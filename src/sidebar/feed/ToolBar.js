import _ from 'lodash';
import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import FolderPlusIcon from '../ui/FolderPlusIcon';
import FeedMenu from './FeedMenu';
import ActionsMenu from './ActionsMenu';
import Actions from '../../shared/Actions';

export default class ToolBar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                zIndex: 5
            },
            tools: {
                display: 'flex',
                width: '100%',
                background: Theme.palette.accentBackground,
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
                borderBottom: '1px solid ' + Colors.lightWhite,
                marginLeft: 20
            },
            titleText: {
                flexGrow: 1,
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
                <div style={styles.tools}>
                    <div style={styles.title} onClick={Actions.toggleFeedMenu}>
                        <div style={styles.titleText}>
                            {this.props.feed.name}
                        </div>
                        <FontIcon
                            className="material-icons"
                            color={Colors.lightWhite}>
                            arrow_drop_down
                        </FontIcon>
                    </div>
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