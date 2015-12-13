import _ from 'lodash';
import React from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import HoverIconButton from '../ui/HoverIconButton';
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
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    tooltip="Topics">
                                    folder
                                </HoverIconButton>}>
                        <FeedList feeds={this.props.feeds}/>
                    </Tab>
                    <Tab value="add"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    tooltip="New">
                                    add
                                </HoverIconButton>}>
                        <FeedEdit/>
                    </Tab>
                    <Tab value="edit"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    tooltip="Rename">
                                    edit
                                </HoverIconButton>}>
                        {feed ? <FeedEdit feed={feed}/> : null}
                    </Tab>
                    <Tab value="collaborate"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    tooltip="Collaborate">
                                    group
                                </HoverIconButton>}>
                        {feed ? <FeedShare feed={feed}/> : null}
                    </Tab>
                    <Tab value="export"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    tooltip="Export">
                                    file_download
                                </HoverIconButton>}>
                        {feed ? <FeedExport/> : null}
                    </Tab>
                    <Tab value="remove"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    tooltip="Delete">
                                    delete
                                </HoverIconButton>}>
                        {feed ? <FeedRemove feed={feed}/> : null}
                    </Tab>
                </Tabs>
                <div style={styles.overlay} onClick={Actions.toggleFeedMenu}/>
            </div>
        );
    }
}