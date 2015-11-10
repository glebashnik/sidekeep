import React from 'react';
import * as HtmlHelper from '../../shared/helpers/HtmlHelper';

import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';

import Snippet from '../ui/Snippet';
import Actions from '../../shared/Actions';
import Comment from './Comment';
import Theme from '../Theme';
import Radium from 'radium';

export default class Clip extends React.Component {
    state = {
        tools: false,
        comment: false
    };

    static propTypes = {
        clip: React.PropTypes.object.isRequired
    };

    enterClip = () => {
        this.setState({tools: true});
    };

    leaveClip = () => {
        this.setState({tools: false});
    };

    startComment = () => {
        this.setState({comment: true});
    };

    acceptComment = (event) => {
        Actions.comment(this.props.clip.id, event.target.value);
        this.setState({comment: false});
    };

    cancelComment = () => {
        this.setState({comment: false});
    };

    removeClip = () => {
        Actions.removePost(this.props.clip.id);
    };

    render() {
        let clip = this.props.clip;

        let styles = {
            clip: {
                position: 'relative'
            },
            content: {
                position: 'relative'
            },
            snippet: {
                font: Theme.font.content,
                color: Theme.palette.textColor
            },
            button: {
                margin: 0,
                padding: 0
            },
            icon: {
                color: Colors.grey500
            },
            tools: {
                display: 'flex',
                direction: 'row',
                background: Colors.darkWhite,
                position: 'absolute',
                bottom: 0,
                right: 0,
                marginBottom: -10
            },
            comment: {
                display: 'flex',
                direction: 'row',
                marginRight: -10
            }
        };

        let tools;
        if (this.state.tools)
            tools = (
                <div style={styles.tools}>
                    <IconButton iconClassName="material-icons" iconStyle={styles.icon} onClick={this.startComment}>comment</IconButton>
                    <IconButton iconClassName="material-icons" style={styles.remove} iconStyle={styles.icon} onClick={this.removeClip}>delete</IconButton>
                </div>);

        let comment;
        if (this.state.comment)
            comment = (
                <div style={styles.comment}>
                    <TextField hintText="Comment" multiLine={true} onEnterKeyDown={this.acceptComment}/>
                    <IconButton iconClassName="material-icons" iconStyle={styles.icon} onClick={this.cancelComment}>clear</IconButton>
                </div>
            );

        let comments;
        if (clip.children)
            comments = (
                <div>
                    {clip.children.map((comment, index) => <Comment comment={comment} key={index}/>)}
                </div>
            );

        return (
            <div style={styles.clip}>
                <div style={styles.content} onMouseEnter={this.enterClip} onMouseLeave={this.leaveClip}>
                    <Snippet maxLines={4} text={HtmlHelper.strip(clip.text)} style={styles.snippet}/>
                    {tools}
                </div>
                {comment}
                {comments}
            </div>
        );
    }
}