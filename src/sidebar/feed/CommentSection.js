import _ from 'lodash';
import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import Actions from '../../shared/Actions';
import Comment from './Comment';

export default class CommentSection extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        post: React.PropTypes.object.isRequired
    };

    submitComment = (event) => {
        event.preventDefault();
        Actions.comment(this.props.post.id, this.refs.newComment.getValue());
        this.refs.newComment.clearValue();
    };

    render() {
        let styles = {
            newComment: {
                display: 'flex',
                marginTop: 5,
                alignItems: 'center'
            },
            avatar: {
                marginRight: 10,
                flexShrink: 0
            },
            avatarImage: {
                maxHeight: 70,
                width: '100%',
                objectFit: 'cover'
            }
        };

        const post = this.props.post;

        const comments = _.filter(post.children, {type: 'comment'});

        const commentElems = comments
            ? comments.map((comment, index) => <Comment comment={comment} key={index}/>)
            : undefined;

        const newCommentElem = post.id === this.props.ui.selectedPostId ?
            <div style={styles.newComment}>
                <Avatar style={styles.avatar} src={this.props.user.image}/>
                <TextField
                    style={{fontSize: 14}}
                    hintText="Comment"
                    multiLine={true}
                    ref='newComment'
                    onEnterKeyDown={this.submitComment}/>
            </div>
            : undefined;

        return (
            <div>
                {commentElems}
                {newCommentElem}
            </div>
        );
    }
}