import _ from 'lodash';
import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import Theme from '../Theme';
import IconButton from '../ui/HoverIconButton';
import HoverIconButton from '../ui/HoverIconButton';
import FeedList from './FeedList';
import EditFeed from './EditFeed';
import ExportFeed from './ExportFeed';
import Help from './Help';

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
                maxHeight: '85%',
                overflowY: 'scroll'
            },
            overlay: {
                width: '100%',
                flexGrow: 1,
                background: 'rgba(0, 0, 0, 0.54)'
            },
            inkBar: {
                background: 'white',
                marginTop: -5,
                height: 5
            }
        };

        const state = this.props.state;
        const tab = state.ui.tab;
        console.log(tab);
        const selectedFeed = _.find(state.feeds, {selected: true});

        return (
            <div style={styles.container}>
                <Tabs
                    inkBarStyle={styles.inkBar}
                    contentContainerStyle={styles.content}
                    value={tab}
                    onChange={Actions.changeTab}>
                    <Tab value="list"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    selectColor="white"
                                    selected={tab === 'list'}
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
                                    selected={tab === 'edit'}
                                    tooltip="Edit">
                                    edit
                                </HoverIconButton>}>
                        {selectedFeed ? <EditFeed feed={selectedFeed}/> : null}
                    </Tab>
                    <Tab value="export"
                         label={<IconButton tooltip="Export">
                                    <ExportIcon
                                        color={tab === 'export' ? 'white' : Theme.palette.iconLight}
                                        hoverColor="white"/>
                                </IconButton>}>
                        {selectedFeed ? <ExportFeed state={state}/> : null}
                    </Tab>
                    <Tab value="help"
                         label={<HoverIconButton
                                    iconClassName="material-icons"
                                    color={Theme.palette.iconLight}
                                    hoverColor="white"
                                    selectColor="white"
                                    selected={tab === 'help'}
                                    tooltip="Help">
                                    help
                                </HoverIconButton>}>
                        <Help/>
                    </Tab>
                </Tabs>
                <div style={styles.overlay} onClick={Actions.toggleMenu}/>
            </div>
        );
    }
}
