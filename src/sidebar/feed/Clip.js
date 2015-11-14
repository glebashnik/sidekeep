import React from 'react';
import * as HtmlHelper from '../../shared/helpers/HtmlHelper';

import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import Snippet from '../ui/Snippet';
import Actions from '../../shared/Actions';
import Comment from './Comment';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';

import ImageContent from './ImageContent';

export default class Clip extends React.Component {
    state = {
        tools: false,
        newComment: '',
        expanded: false
    };

    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        clip: React.PropTypes.object.isRequired
    };

    startComment = () => {
        this.setState({comment: true});
    };

    acceptComment = (event) => {
        event.preventDefault();
        Actions.comment(this.props.clip.id, this.refs.newComment.getValue());
        this.refs.newComment.clearValue();
    };

    selectClip = () => {
        if (this.props.clip.id === this.props.ui.selectedClipId)
            return;

        Actions.selectClip(this.props.clip.id);
    };

    render() {
        let clip = this.props.clip;

        let styles = {
            clip: {
                position: 'relative',
                padding: '10px 10px 10px 10px',
                cursor: 'pointer'
            },
            snippet: {
                font: Theme.font.content,
                color: Theme.palette.textColor
            },
            button: {
                margin: 0,
                padding: 0
            },
            comment: {
                display: 'flex',
                marginTop: 5,
                alignItems: 'center'
            },
            avatar: {
                marginRight: 10,
                flexShrink: 0
            },
            image: {
                maxHeight: 70,
                width: '100%',
                objectFit: 'cover'
            }
    };

        let comments;
        if (clip.children)
            comments = (
                <div>
                    {clip.children.map((comment, index) => <Comment comment={comment} key={index}/>)}
                </div>
            );

        let comment;
        let maxLines = 4;

        if (clip.id === this.props.ui.selectedClipId) {
            maxLines = 100;
            styles.clip.background = '#FEEABC';

            comment = (
                <div style={styles.comment}>
                    <Avatar style={styles.avatar} src={this.props.user.image}/>
                    <TextField
                        style={{fontSize: 14}}
                        hintText="Comment"
                        multiLine={true}
                        ref='newComment'
                        onEnterKeyDown={this.acceptComment}/>
                </div>
            );
        }

        let content;

        switch (clip.type) {
            case 'text':
                content = <Snippet maxLines={maxLines} text={HtmlHelper.strip(clip.text)} style={styles.snippet}/>;
                break;
            case 'image':
                content = <ImageContent ui={this.props.ui} clip={clip}/>;
                break;
        }

        return (
            <div style={styles.clip} onClick={this.selectClip}>
                {content}
                {comments}
                {comment}
            </div>
        );
    }
}