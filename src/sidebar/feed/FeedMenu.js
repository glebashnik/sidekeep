import _ from 'lodash';
import React from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import IconButton from '../ui/HoverIconButton';
import HoverIconButton from '../ui/HoverIconButton';
import FeedList from './FeedList';
import EditFeed from './EditFeed';
import FeedShare from './FeedShare';
import FeedExport from './FeedExport';
import ExportIcon from '../icons/ExportIcon';

import Actions from '../../shared/Actions';

export default class FeedMenu extends React.Component {
    static propTypes = {
        state: React.PropTypes.object.isRequired
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
            }
        };

        const state = this.props.state;
        const selectedFeed = _.find(this.props.state.feeds, {selected: true});

        return (
            <div style={styles.container}>
                <Tabs
                    inkBarStyle={styles.inkBar}
                    contentContainerStyle={styles.content}
                    value={state.tab}
                    onChange={Actions.changeTab}>
                    <Tab value="list"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    selectColor="white"
                                    selected={state.tab === 'list'}
                                    tooltip="Topics">
                                    folder
                                </HoverIconButton>}>
                        <FeedList feeds={state.feeds}/>
                    </Tab>
                    <Tab value="edit"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    selectColor="white"
                                    selected={state.tab === 'edit'}
                                    tooltip="Edit">
                                    edit
                                </HoverIconButton>}>
                        {selectedFeed ? <EditFeed feed={selectedFeed}/> : null}
                    </Tab>
                    <Tab value="collaborate"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    selectColor="white"
                                    selected={state.tab === 'collaborate'}
                                    tooltip="Collaborate">
                                    group
                                </HoverIconButton>}>
                        {selectedFeed ? <FeedShare feed={selectedFeed}/> : null}
                    </Tab>
                    <Tab value="export"
                         label={<IconButton tooltip="Export">
                                    <ExportIcon
                                        color={state.tab === 'export' ? 'white' : Theme.palette.iconLight}
                                        hoverColor="white"/>
                                </IconButton>}>
                        {selectedFeed ? <FeedExport state={state}/> : null}
                    </Tab>
                    <Tab value="help"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    selectColor="white"
                                    selected={state.tab === 'help'}
                                    tooltip="Help">
                                    help
                                </HoverIconButton>}>
                    </Tab>
                </Tabs>
                <div style={styles.overlay} onClick={Actions.toggleFeedMenu}/>
            </div>
        );
    }
}