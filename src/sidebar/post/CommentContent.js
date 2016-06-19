import React from 'react';
import Avatar from 'material-ui/Avatar';
import Theme from '../Theme';

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
                font: Theme.font.comment,
                color: Theme.palette.textDark,
                padding: '10px 15px 10px 15px'
            },
            avatar: {
                flexShrink: 0,
                margin: 0
            },
            text: {
                marginLeft: 15,
                flexGrow: 1
            },
            name: {
                font: Theme.font.user,
                color: Theme.palette.user,
                cursor: 'pointer'
            }
        };

        return (
            <div style={styles.container}>
                <Avatar size={35} style={styles.avatar} src={post.user.image}/>
                <div style={styles.text}>
                    <span style={styles.name}>{post.user.name}</span>
                    &nbsp;{post.text}
                </div>
            </div>
        );
    }
}