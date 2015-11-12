import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Theme from '../Theme';
import Avatar from 'material-ui/lib/avatar';
import Actions from '../../shared/Actions';
import Radium from 'radium';

@Radium class Comment extends React.Component {
    state = {
        tools: false
    };

    static propTypes = {
        comment: React.PropTypes.object.isRequired
    };

    enter = () => {
        this.setState({tools: false});
    };

    leave = () => {
        this.setState({tools: false});
    };

    remove = () => {
        Actions.removePost(this.props.comment.id);
    };

    render() {
        let comment = this.props.comment;

        let styles = {
            comment: {
                display: 'flex',
                marginTop: 10,
                alignItems: 'center',
                position: 'relative',
                font: Theme.font.primary,
                color: Theme.palette.textColor
            },
            avatar: {
                flexShrink: 0
            },
            text: {
                marginLeft: 10,
                flexGrow: 1
            },
            name: {
                font: Theme.font.accent,
                color: Theme.palette.primary1Color,
                cursor: 'pointer',
                ':hover': {
                    textDecoration: 'underline'
                }
            },
            tools: {
                background: Colors.darkWhite,
                position: 'absolute',
                height: '100%',
                right: 0,
                display: 'flex',
                direction: 'row',
                alignItems: 'center'
            },
            remove: {
                color: Colors.grey600
            }
        };

        let tools;
        if (this.state.tools)
            tools = (
                <div style={styles.tools}>
                    <IconButton iconClassName="material-icons" iconStyle={styles.remove}
                                onClick={this.remove}>delete</IconButton>
                </div>
            );

        return (
            <div style={styles.comment} onMouseEnter={this.enter} onMouseLeave={this.leave}>
                <Avatar style={styles.avatar} src={comment.user.image}/>

                <div style={styles.text}>
                    <span style={styles.name}>{comment.user.name}</span>
                    &nbsp;{comment.text}
                </div>
                {tools}
            </div>
        );
    }
}

export default Comment;