import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import List from 'material-ui/lib/lists/list';
import Paper from 'material-ui/lib/paper';
import ListItem from 'material-ui/lib/lists/list-item';
import Actions from '../../shared/Actions';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';

export default class FeedMenu extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    };

    addFeed = () => {
        const nameField = this.refs.nameField;
        Actions.addFeed(nameField.getValue());
        nameField.setValue('');
    };

    render() {
        const styles = {
            menu: {
                position: 'absolute',
                zIndex: 5,
                width: '100%',
                background: '#4C97ED',
                boxShadow: '0 3px 3px rgba(0, 0, 0, 0.23)'
            },
            header1: {
                background: '#4C97ED',
                margin: 0,
                padding: '0 30px 0 15px'
            },
            header2: {
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
            <div style={styles.menu}>
                <ListItem style={styles.header1}
                          disabled={true}
                          primaryText={
                        <div style={styles.header2}>
                            <IconButton style={styles.add}>
                                <AddIcon color={'white'}/>
                            </IconButton>
                            <TextField
                            underlineStyle={{borderBottom: 'solid 2px #C0D9F2'}}
                            underlineFocusStyle={{borderColor: 'white'}}
                            inputStyle={{color: 'white'}}
                            hintStyle={{color: '#C0D9F2'}} ref="nameField" hintText="Add a topic" onEnterKeyDown={this.addFeed}/>
                        </div>}/>
                {user.feeds.map((feed, index) =>
                    <FeedItem key={index}
                              feed={feed}
                              isSelected={feed.id === user.selectedFeed}/>)}
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
        return <ListItem
            style={{
                color: 'white',
                padding: '0 10px 0 10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
                }}
            primaryText={this.props.feed.name}
            onClick={this.selectFeed}/>
    }
}