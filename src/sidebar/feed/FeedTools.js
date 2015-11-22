import React from 'react';

import FontIcon from 'material-ui/lib/font-icon';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import FeedShare from './FeedShare';
import FeedEdit from './FeedEdit';
import FeedRemove from './FeedRemove';
import WordIcon from '../icons/WordIcon';

import Actions from '../../shared/Actions';

export default class FeedTools extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    render() {
        const styles = {
            inkBar: {
                backgroundColor: 'white'
            },
            icon: {
                color: 'white'
            }
        };

        return (
            <Tabs tabItemContainerStyle={styles.tabs} inkBarStyle={styles.inkBar} initialSelectedIndex={-1}>
                <Tab label={<FontIcon className="material-icons" color={styles.icon.color}>edit</FontIcon>}>
                    <FeedEdit feed={this.props.feed} onClose={this.props.onClose}/>
                </Tab>
                <Tab label={<FontIcon className="material-icons" color={styles.icon.color}>group</FontIcon>}>
                    <FeedShare feed={this.props.feed} onClose={this.props.onClose}/>
                </Tab>
                <Tab label={<WordIcon style={{fill: styles.icon.color}}/>} onActive={Actions.exportToWord}>
                    <div style={{fontSize: 14, padding: 20}}>
                        Exports collected information to a Word document.
                        The download will start shortly.
                    </div>
                </Tab>
                <Tab label={<FontIcon className="material-icons" color={styles.icon.color}>delete</FontIcon>}>
                    <FeedRemove feed={this.props.feed} onClose={this.props.onClose}/>
                </Tab>
            </Tabs>
        );
    }
}