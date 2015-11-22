import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';
import Theme from '../../Theme';

export default class CommentContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    state = {
        tools: false
    };

    render() {
        const post = this.props.post;

        const styles = {
            container: {
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                font: Theme.font.primary,
                color: Theme.palette.textColor,
                padding: '5px 10px 5px 10px'
            },
            avatar: {
                flexShrink: 0,
                margin: 0
            },
            text: {
                marginLeft: 10,
                flexGrow: 1
            },
            name: {
                font: Theme.font.accent,
                color: Theme.palette.accentText,
                cursor: 'pointer'
            }
        };

        return (
            <div style={styles.container}>
                <Avatar style={styles.avatar} src={post.user.image}/>
                <div style={styles.text}>
                    <span style={styles.name}>{post.user.name}</span>
                    &nbsp;{post.text}
                </div>
            </div>
        );
    }
}