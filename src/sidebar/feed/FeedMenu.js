import _ from 'lodash';
import React from 'react';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import FeedList from './FeedList';
import FeedEdit from './FeedEdit';
import FeedShare from './FeedShare';
import FeedExport from './FeedExport';
import FeedRemove from './FeedRemove';
import ExportIcon from '../icons/ExportIcon';

import Actions from '../../shared/Actions';

export default class FeedMenu extends React.Component {
    static propTypes = {
        feeds: React.PropTypes.object.isRequired
    };

    state = {
        tab: 'list'
    };

    selectedFeed = () => {
        return _.find(this.props.feeds, {selected: true})
    };

    componentWillReceiveProps(nextProps) {
    };

    change = (value) => {
        this.setState({tab: value});
    };

    render() {
        const styles = {
            container: {
                position: 'absolute',
                top: 48,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            },
            content: {
                background: 'white',
                maxHeight: '75%',
                overflowY: 'scroll'
            },
            overlay: {
                width: '100%',
                flexGrow: 1,
                background: Colors.lightBlack
            },
            inkBar: {
                background: 'white',
                marginTop: -5,
                height: 5
            },
            icon: {
                color: Theme.palette.iconLight
            }
        };

        const feed = this.selectedFeed();

        return (
            <div style={styles.container}>
                <Tabs
                    inkBarStyle={styles.inkBar}
                    contentContainerStyle={styles.content}
                    value={this.state.tab}
                    onChange={this.change}>
                    <Tab value="list"
                         label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Topics">folder</IconButton>}>
                        <FeedList feeds={this.props.feeds}/>
                    </Tab>
                    <Tab value="add"
                         label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="New">add</IconButton>}>
                        <FeedEdit/>
                    </Tab>
                    <Tab value="edit"
                         label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Rename">edit</IconButton>}>
                        {feed ? <FeedEdit feed={feed}/> : null}
                    </Tab>
                    <Tab value="collaborate"
                         label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Collaborate">group</IconButton>}>
                        {feed ? <FeedShare feed={feed}/> : null}
                    </Tab>
                    <Tab value="export"
                         label={<IconButton tooltip="Export"><ExportIcon color={styles.icon.color}/></IconButton>}>
                        {feed ? <FeedExport/> : null}
                    </Tab>
                    <Tab value="remove"
                         label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Delete">delete</IconButton>}>
                        {feed ? <FeedRemove feed={feed}/> : null}
                    </Tab>
                </Tabs>
                <div style={styles.overlay} onClick={Actions.toggleFeedMenu}/>
            </div>
        );
    }
}