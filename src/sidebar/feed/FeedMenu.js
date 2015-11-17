import _ from 'lodash';
import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import ListItem from 'material-ui/lib/lists/list-item';
import Actions from '../../shared/Actions';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Overlay from 'material-ui/lib/overlay';
import Theme from '../Theme';

export default class FeedMenu extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    };

    addFeed = () => {
        const nameField = this.refs.nameField;
        const name = nameField.getValue();

        if (name) {
            Actions.createFeed(name);
            nameField.setValue('');
            Actions.toggleFeedMenu();
        }
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
            },
            overlay: {
                position: 'absolute'
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
                    {_.map(user.feeds, (feed, id) => <FeedItem key={id} feed={feed} user={user}/>)}
                </div>
                <Overlay style={styles.overlay} onClick={Actions.toggleFeedMenu} show/>
            </div>
        );
    }
}

class FeedItem extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired
    };

    selectFeed = () => {
        Actions.selectFeed(this.props.feed.id);
        Actions.toggleFeedMenu();
    };

    render() {
        const style = {
            padding: '0 20px 0 10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: this.props.user.selectedFeed === this.props.feed.id ? Theme.palette.primary1Color : Colors.darkBlack
        };

        return <ListItem onClick={this.selectFeed} primaryText={<div style={style}>{this.props.feed.name}</div>}/>
    }
}