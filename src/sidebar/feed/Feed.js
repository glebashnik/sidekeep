import React from 'react';
import Post from './Post';
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from '../ui/CircularProgress';
import WordIcon from '../ui/WordIcon';
import PowerPointIcon from '../ui/PowerPointIcon';
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

    exportToDocx = () => {
        Actions.exportToDocx();
    };

    exportToPptx = () => {
        Actions.exportToPptx();
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
                font: '400 17px Roboto',
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
            },
            menuItem: {
                fontSize: 14
            }
        };

        let assistant = (
            <IconButton
                iconClassName="material-icons"
                iconStyle={styles.icon}
                onClick={this.assist}
                touch={true}
                tooltipPosition="bottom-center"
                tooltip="Recommend">
                face
            </IconButton>
        );

        if (this.state.assisting)
            assistant = (
                <CircularProgress mode="indeterminate"
                                  color="white"
                                  innerStyle={styles.progress}/>
            );

        //assistant = undefined;

        return (
            <div style={styles.feed}>
                <AppBar title={
                            <div style={styles.title}>{this.props.feed.name.toUpperCase()}</div>
                        }
                        iconElementLeft={
                            <IconButton
                                iconClassName="material-icons"
                                onClick={this.close}
                                touch={true}
                                tooltipPosition="bottom-right"
                                tooltip="Hide">
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
                                <MenuItem primaryText="Export to Word" onClick={this.exportToDocx} style={styles.menuItem} leftIcon={<WordIcon/>}/>
                                <MenuItem primaryText="Export to PowerPoint" onClick={this.exportToPptx} style={styles.menuItem} leftIcon={<PowerPointIcon/>}/>
                                <MenuItem primaryText="Exit Feed" onClick={this.exit} style={styles.menuItem} leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}/>
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