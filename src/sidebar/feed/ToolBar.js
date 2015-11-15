import _ from 'lodash';
import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import FolderPlusIcon from '../ui/FolderPlusIcon';
import TopicMenu from './TopicMenu';
import TopicSettings from './TopicSettings';
import Actions from '../../shared/Actions';

export default class ToolBar extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    toggleTopicMenu = () => {
        Actions.toggleFeedMenu();
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
                borderBottom: '1px solid ' + Colors.lightWhite
            },
            titleText: {
                flexGrow: 1,
                font: '400 17px Roboto',
                color: Theme.palette.accentForeground
            }
        };

        const topicMenuElem = this.props.ui.feedMenu
            ? <TopicMenu user={this.props.user}/>
            : undefined;

        const topicSettingsElem = this.props.ui.topicSettings
            ? <TopicSettings user={this.props.user} feed={this.props.feed}/>
            : undefined;

        return (
            <div style={styles.container}>
                <div style={styles.tools}>
                    <IconButton
                        onClick={Actions.createTopic}
                        tooltipPosition="bottom-right"
                        touch={true}
                        tooltip="New topic">
                        <FolderPlusIcon color={styles.icon.color}/>
                    </IconButton>
                    <div style={styles.title} onClick={this.toggleTopicMenu}>
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
                        onClick={Actions.openTopicSettings}
                        iconClassName="material-icons"
                        iconStyle={styles.icon}
                        tooltipPosition="bottom-left"
                        touch={true}
                        tooltip="Topic settings">
                        settings
                    </IconButton>
                </div>
                {topicMenuElem}
                {topicSettingsElem}
            </div>

        );
    }
}