import React from 'react';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import FeedAdd from './FeedAdd';
import FeedEdit from './FeedEdit';
import FeedShare from './FeedShare';
import FeedExport from './FeedExport';
import FeedRemove from './FeedRemove';
import ExportIcon from '../icons/ExportIcon';

export default class FeedTools extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object
    };

    state = {
        tab: '-1'
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.feed)
            this.setState({tab: '-1'});
    };

    change = (value) => {
        if (this.props.feed || value === 'add')
            this.setState({tab: value});
    };

    close = () => {
        this.setState({tab: '-1'});
    };

    render() {
        const styles = {
            inkBar: {
                background: Colors.grey200,
                marginTop: -5,
                height: 5
            },
            icon: {
                color: Colors.grey50
            },
            container: {
                background: Colors.grey200
            },
            tabs: {
                zIndex: 6,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            }
        };

        return (
            <Tabs style={styles.tabs}
                  contentContainerStyle={styles.container}
                  inkBarStyle={styles.inkBar}
                  value={this.state.tab}
                  onChange={this.change}>
                <Tab value="add"
                     label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="New">add</IconButton>}>
                    <FeedAdd onClose={this.close}/>
                </Tab>
                <Tab value="edit"
                     label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Rename">edit</IconButton>}>
                    {this.props.feed ? <FeedEdit feed={this.props.feed} onClose={this.close}/> : undefined}
                </Tab>
                <Tab value="group"
                     label={
                     <IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Collaborate">group</IconButton>}>
                    {this.props.feed ? <FeedShare feed={this.props.feed} onClose={this.close}/> : undefined}
                </Tab>
                <Tab value="export"
                     label={<IconButton tooltip="Export"><ExportIcon color={styles.icon.color}/></IconButton>}>
                    {this.props.feed ? <FeedExport onClose={this.close}/> : undefined}
                </Tab>
                <Tab value="remove"
                     label={<IconButton iconClassName="material-icons" iconStyle={styles.icon} tooltip="Delete">delete</IconButton>}>
                    {this.props.feed ? <FeedRemove feed={this.props.feed} onClose={this.close}/> : undefined}
                </Tab>
            </Tabs>
        );
    }
}