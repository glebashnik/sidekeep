import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import List from 'material-ui/lib/lists/list';
import Paper from 'material-ui/lib/paper';
import ListItem from 'material-ui/lib/lists/list-item';
import Actions from '../../shared/Actions';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Overlay from 'material-ui/lib/overlay';

export default class FeedMenu extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    };

    addFeed = () => {
        const nameField = this.refs.nameField;
        const name = nameField.getValue();

        if (name) {
            Actions.addFeed(name);
            nameField.setValue('');
        }
    };

    toggleFeedMenu = () => {
        Actions.toggleFeedMenu();
    };

    render() {
        const styles = {
            container: {
                position: 'absolute',
                zIndex: 5,
                width: '100%',
                top: 48,
                bottom: 0
            },
            menu: {
                position: 'absolute',
                width: '100%',
                zIndex: 10,
                background: 'white',
                maxHeight: '50%',
                overflowY: 'auto'
            },
            headerItem: {
                margin: 0,
                padding: '0 30px 0 15px'
            },
            headerPrimary: {
                display: 'flex',
                alignItems: 'center'
            },
            add: {
                marginLeft: -7,
                marginRight: 7
            }
        };

        const user = this.props.user;

        return (
            <div style={styles.container}>
                <div style={styles.menu}>
                    <ListItem disabled style={styles.headerItem}
                              primaryText={
                                <div style={styles.headerPrimary}>
                                    <IconButton style={styles.add} onClick={this.addFeed}>
                                        <AddIcon color={Colors.grey500}/>
                                    </IconButton>
                                    <TextField ref="nameField" hintText="Add a topic" onEnterKeyDown={this.addFeed}/>
                                </div>}/>
                    {user.feeds.map((feed, index) =>
                        <FeedItem key={index} feed={feed} isSelected={feed.id === user.selectedFeed}/>)}
                </div>
                <Overlay style={{position: 'absolute'}} onClick={this.toggleFeedMenu} show/>
            </div>
        );
    }
}

class FeedItem extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        isSelected: React.PropTypes.bool.isRequired
    };

    selectFeed = () => {
        Actions.selectFeed(this.props.feed.id);
    };

    render() {
        const style = {
            padding: '0 20px 0 10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        };

        return <ListItem
            primaryText={<div style={style}>{this.props.feed.name}</div>}
            onClick={this.selectFeed}/>
    }
}