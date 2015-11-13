import React from 'react';
import * as HtmlHelper from '../../shared/helpers/HtmlHelper';

import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';

import Snippet from '../ui/Snippet';
import PostMenu from './PostMenu';
import Actions from '../../shared/Actions';
import Comment from './Comment';
import Theme from '../Theme';
import Radium from 'radium';

import Avatar from 'material-ui/lib/avatar';

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
        event.preventDefault();
        Actions.comment(this.props.clip.id, this.refs.newComment.getValue());
        this.refs.newComment.clearValue();
    };

    expand = () => {
        if (this.props.clip.id === this.props.ui.expandedClipId)
            return;

        Actions.expandClip(this.props.clip.id);
        this.setState({newComment: ''});
    };

    render() {
        let clip = this.props.clip;

        let styles = {
            clip: {
                position: 'relative',
                padding: '10px 10px 10px 10px',
                margin: '5px 0 5px 0',
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
            icon: {
                color: Colors.grey500
            },
            tools: {
                position: 'absolute',
                top: -40,
                right: 0,
                zIndex: 3
            },
            comment: {
                display: 'flex',
                marginTop: 5,
                alignItems: 'center'
            },
            avatar: {
                marginRight: 10,
                flexShrink: 0
            }
        };

        let tools;
        if (this.state.tools) {
            styles.clip.background = '#FEF3DA';
            //tools = <div style={styles.tools}><PostMenu post={this.props.clip}/></div>;
        } else
            styles.clip.background = 'white';

        let comments;
        if (clip.children)
            comments = (
                <div>
                    {clip.children.map((comment, index) => <Comment comment={comment} key={index}/>)}
                </div>
            );

        let comment;
        let maxLines = 4;

        if (this.props.clip.id === this.props.ui.expandedClipId) {
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

        return (
            <div style={styles.clip}
                 onMouseEnter={this.enterClip}
                 onMouseLeave={this.leaveClip}
                 onClick={this.expand}>
                <Snippet maxLines={maxLines} text={HtmlHelper.strip(clip.text)} style={styles.snippet}/>
                {comments}
                {comment}
            </div>
        );
    }
}