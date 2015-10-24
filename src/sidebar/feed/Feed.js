import React from 'react';
import Post from './Post';
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from '../ui/CircularProgress';
import Actions from '../../shared/Actions';

export default class Feed extends React.Component {
    state = {
        assisting: false
    };

    static propTypes = {
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    exit = () => {
        Actions.exitFeed();
    };

    close = () => {
        Actions.toggleSidebar();
    };

    save = () => {
        Actions.saveFeedToWord();
    };

    closeMenu = () => {
        this.refs.menu.close();
    };

    assist = () => {
        this.setState({assisting: true});
        setTimeout(() => {
            this.setState({assisting: false});
            Actions.assist();
        }, 3000);
    };

    render() {
        const styles = {
            feed: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%'
            },
            title: {
                fontSize: 17,
                color: 'white',
                marginTop: 14,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 130
            },
            posts: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                flexGrow: 1,
                paddingBottom: 10
            },
            right: {
                display: 'flex',
                alignItems: 'center'
            },
            progress: {
                margin: 0,
                padding: 0
            },
            icon: {
                color: 'white'
            }
        };

        let assistant = (
            <IconButton
                iconClassName="material-icons"
                iconStyle={styles.icon}
                onClick={this.assist}
                touch={true}
                tooltipPosition="bottom-center"
                tooltip="Search assistant">
                face
            </IconButton>
        );

        if (this.state.assisting)
            assistant = (
                <CircularProgress mode="indeterminate"
                                  color="white"
                                  innerStyle={styles.progress}/>
            );

        return (
            <div style={styles.feed}>
                <AppBar title={
                            <div style={styles.title}>{this.props.feed.name}</div>
                        }
                        iconElementLeft={
                            <IconButton
                                iconClassName="material-icons"
                                onClick={this.close}
                                touch={true}
                                tooltipPosition="bottom-right"
                                tooltip="Hide sidebar">
                                chevron_right
                            </IconButton>
                        }
                        iconElementRight={
                            <div style={styles.right}>
                            {assistant}
                            <IconMenu
                                ref="menu"
                                iconButtonElement={
                                    <IconButton
                                        iconClassName="material-icons"
                                        iconStyle={styles.icon}>
                                        more_vert
                                    </IconButton>
                                }>
                                <MenuItem primaryText="Close menu" onClick={this.closeMenu} leftIcon={<FontIcon className="material-icons">expand_less</FontIcon>}/>
                                <MenuItem primaryText="Lock feed" leftIcon={<FontIcon className="material-icons">lock_open</FontIcon>}/>
                                <MenuItem primaryText="Save to Word" onClick={this.save} leftIcon={<FontIcon className="material-icons">file_download</FontIcon>}/>
                                <MenuItem primaryText="Exit feed" onClick={this.exit} leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}/>
                            </IconMenu>
                            </div>
                        }/>

                <div style={styles.posts}>
                    {this.props.feed.posts.map((post, index) => <Post post={post} key={index}/>)}
                </div>
            </div>
        );
    }
}