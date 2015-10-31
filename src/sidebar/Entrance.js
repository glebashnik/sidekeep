import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Actions from '../shared/Actions';
import Avatar from './Avatar';
import IconButton from 'material-ui/lib/icon-button';
import Theme from './Theme'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';

class Entrance extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    defaultProps = {
        user: {
            name: ''
        }
    };

    changeUserName = (event) => {
        Actions.changeUserName(event.target.value);
    };

    changeFeedName = (event) => {
        Actions.changeFeedName(event.target.value);
    };

    enter = () => {
        Actions.enterFeed();
    };

    hide = () => {
        Actions.toggleSidebar();
    };

    render() {
        var styles = {
            entrance: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            },

            avatar: {
                marginTop: 30
            },

            enter: {
              marginTop: 35
            },

            close: {
                position: 'fixed',
                top: 12,
                left: 20
            }
        };

        return (
            <div style={styles.entrance}>
                <IconButton
                    iconStyle={styles.close}
                    onClick={this.hide}
                    touch={true}>
                    <ChevronRight/>
                </IconButton>
                <img src={chrome.extension.getURL('images/logo.png')}/>
                <Avatar name={this.props.user.name} style={styles.avatar}/>
                <TextField
                    floatingLabelText="User Name"
                    value={this.props.user.name}
                    onChange={this.changeUserName}/>
                <TextField
                    floatingLabelText="Feed Name"
                    value={this.props.feed.name}
                    onChange={this.changeFeedName}/>
                <RaisedButton style={styles.enter}
                              label="Enter"
                              secondary={true}
                              onClick={this.enter}/>
            </div>
        );
    }
}

export default Entrance;
