import _ from 'lodash';
import React from 'react';

import AddIcon from 'material-ui/lib/svg-icons/content/add';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../shared/Actions';
import Theme from '../Theme';
import HoverBox from '../ui/HoverBox';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import FontIcon from 'material-ui/lib/font-icon';
import WordIcon from '../icons/WordIcon';

import copy from 'copy-to-clipboard';

export default class FeedMenu extends React.Component {
    static propTypes = {
        feeds: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            container: {
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 5,
                width: '100%',
                bottom: 0,
                top: 48
            },
            menu: {
                width: '100%',
                zIndex: 10,
                background: 'white',
                overflowY: 'auto'
            },
            overlay: {
                flexGrow: 1,
                background: Colors.lightBlack
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.menu}>
                    <NewFeedItem/>
                    {_.map(this.props.feeds, (feed, id) => <FeedItem key={id} feed={feed}/>)}
                </div>
                <div style={styles.overlay} onClick={Actions.toggleFeedMenu}/>
            </div>
        );
    }
}


class NewFeedItem extends React.Component {
    addFeed = () => {
        const nameField = this.refs.nameField;
        const name = nameField.getValue();

        if (name) {
            Actions.addFeed(name);
            nameField.setValue('');
        }
    };

    render() {
        const style = {
            display: 'flex',
            alignItems: 'center',
            padding: '0 25px 0 0'
        };

        return (
            <div style={style}>
                <IconButton onClick={this.addFeed}>
                    <AddIcon color={Colors.grey600}/>
                </IconButton>
                <TextField ref="nameField" hintText="Add a topic" onEnterKeyDown={this.addFeed}/>
            </div>
        );
    }
}


class FeedItem extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired
    };

    state = {
        hover: false,
        editor: false,
        tools: false
    };

    enter = () => {
        this.setState({hover: true});
    };

    leave = () => {
        this.setState({hover: false});
    };

    select = () => {
        Actions.selectFeed(this.props.feed.id);
        Actions.toggleFeedMenu();
    };

    startEdit = (e) => {
        e.stopPropagation();
        Actions.selectFeed(this.props.feed.id);
        this.setState({editor: true});
    };

    endEdit = (e) => {
        this.setState({editor: false});
    };

    stopPropagation = (e) => {
        e.stopPropagation();
    };

    toggleTools = (e) => {
        e.stopPropagation();
        Actions.selectFeed(this.props.feed.id);
        this.setState({tools: !this.state.tools});
    };

    render() {
        const styles = {
            container: {},
            content: {
                position: 'relative',
                padding: '15px 20px 15px 20px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                font: '400 16px Roboto',
                cursor: 'pointer',
                color: Colors.darkBlack
            },
            expand: {
                position: 'absolute',
                top: 0,
                right: 0
            },
            expandIcon: {
                color: Colors.grey600
            }
        };

        if (this.state.hover)
            styles.container.background = Theme.palette.hoverBackground;
        if (this.props.feed.selected)
            styles.container.background = Theme.palette.selectBackground;

        //const tools = this.state.hover ?
        //    <div style={styles.tools}>
        //        <IconButton
        //            iconStyle={styles.icon}
        //            iconClassName="material-icons"
        //            onClick={this.startEdit}>
        //            edit
        //        </IconButton>
        //        <IconButton
        //            iconStyle={styles.icon}
        //            iconClassName="material-icons"
        //            onClick={this.stopPropagation}>
        //            group
        //        </IconButton>
        //        <IconButton
        //            iconStyle={styles.icon}
        //            iconClassName="material-icons"
        //            onClick={this.stopPropagation}>
        //            delete
        //        </IconButton>
        //    </div>
        //    : undefined;
        //
        //const editor = this.state.editor ?
        //    <FeedEditor feed={this.props.feed} onSave={this.endEdit} onCancel={this.endEdit}/>
        //    : undefined;

        const expand = this.state.hover || this.props.feed.selected ?
            <IconButton
                style={styles.expand}
                iconStyle={styles.expandIcon}
                iconClassName="material-icons"
                onClick={this.toggleTools}>
                {this.state.tools ? 'expand_less' : 'expand_more'}
            </IconButton> : undefined;

        const tools = this.state.tools && this.props.feed.selected ? <FeedTools feed={this.props.feed}/> : undefined;

        return (
            <div
                style={styles.container}>
                <div style={styles.content}
                     onMouseEnter={this.enter}
                     onMouseLeave={this.leave}
                     onClick={this.select}>
                    {this.props.feed.name}
                    {expand}
                </div>
                {tools}
            </div>
        );
    }
}

class FeedTools extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired
    };

    state = {
        tab: '-1'
    };

    changeTab = (value) => {
        this.setState({tab: value});
    };

    close = () => {
        this.setState({tab: '-1'});
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
            <Tabs tabItemContainerStyle={styles.tabs} inkBarStyle={styles.inkBar} value={this.state.tab} onChange={this.changeTab}>
                <Tab value="edit" label={<FontIcon className="material-icons" color={styles.icon.color}>edit</FontIcon>}>
                    <FeedEditTool feed={this.props.feed} onClose={this.close}/>
                </Tab>
                <Tab value="share" label={<FontIcon className="material-icons" color={styles.icon.color}>group</FontIcon>}>
                    <FeedShareTool feed={this.props.feed} onClose={this.close}/>
                </Tab>
                <Tab value="export" label={<WordIcon style={{fill: styles.icon.color}}/>} onActive={Actions.exportToWord}>
                    <div style={{fontSize: 14, padding: 20}}>
                        Exports collected information to a Word document.
                        The download will start shortly.
                    </div>
                </Tab>
                <Tab value="remove" label={<FontIcon className="material-icons" color={styles.icon.color}>delete</FontIcon>}>
                    <FeedRemoveTool feed={this.props.feed} onClose={this.close}/>
                </Tab>
            </Tabs>
        );
    }
}

class FeedEditTool extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        this.refs.name.focus();
    }

    save = () => {
        Actions.renameFeed(this.props.feed.id, this.refs.name.getValue());
        this.props.onClose();
    };

    cancel = () => {
        this.refs.name.setValue(this.props.feed.name);
        this.props.onClose();
    };

    stopPropagation = (e) => {
        e.stopPropagation();
    };

    render() {
        const styles = {
            container: {
                padding: '0 20px 20px 20px',
                display: 'flex',
                flexDirection: 'column'
            },
            buttons: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <TextField
                    onChange={this.stopPropagation}
                    floatingLabelText="Edit topic name"
                    defaultValue={this.props.feed.name}
                    ref="name"/>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Save" onClick={this.save}/>
                    <RaisedButton style={styles.button} label="Cancel" onClick={this.cancel}/>
                </div>
            </div>
        );
    }
}

class FeedShareTool extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    state = {
        url: 'https://aftersearch.firebaseapp.com/join.html?feed=' + encodeURIComponent(this.props.feed.id)
    };

    copy = () => {
        copy(this.state.url);
    };

    render() {
        const styles = {
            container: {
                padding: 20,
                display: 'flex',
                flexDirection: 'column'
            },
            text: {
                fontSize: 14
            },
            buttons: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.text}>
                    Collect information together with your friends.
                    Copy this link and send it to them in email or chat.
                </div>
                <TextField
                    disabled={true}
                    defaultValue={this.state.url}/>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="Copy link" onClick={this.copy}/>
                    <RaisedButton style={styles.button} label="Close" onClick={this.props.onClose}/>
                </div>
            </div>
        );
    }
}

class FeedRemoveTool extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    remove = () => {
        Actions.removeFeed(this.props.feed.id);
        this.props.onClose();
    };

    render() {
        const styles = {
            container: {
                padding: 20,
                display: 'flex',
                flexDirection: 'column'
            },
            text: {
                fontSize: 14
            },
            buttons: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
            },
            button: {
                margin: '0 10px 0 10px'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.text}>Everything collected in this topic will be lost. Do you want to proceed?</div>
                <div style={styles.buttons}>
                    <RaisedButton style={styles.button} label="No, Keep" onClick={this.props.onClose}/>
                    <RaisedButton style={styles.button} label="Yes, Delete" onClick={this.remove}/>
                </div>
            </div>
        );
    }
}