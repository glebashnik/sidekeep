import React from 'react';
import * as HtmlHelper from '../../shared/helpers/HtmlHelper';

import Snippet from '../ui/Snippet';
import Actions from '../../shared/Actions';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';

import HoverBox from '../ui/HoverBox';
import ImageContent from './ImageContent';
import CommentSection from './CommentSection';
import PostToolbar from './PostToolbar';

export default class Clip extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        clip: React.PropTypes.object.isRequired
    };

    selectPost = () => {
        Actions.selectPost(this.props.clip.id);
    };

    render() {
        let styles = {
            clip: {
                padding: 10,
                cursor: 'pointer'
            },
            clipHover: {
                background: '#FEEABC'
            },
            snippet: {
                font: Theme.font.content,
                color: Theme.palette.textColor
            }
        };

        let toolbar;
        let clip = this.props.clip;
        let maxLines = 4;

        if (clip.id === this.props.ui.selectedPostId) {
            maxLines = 100;
            styles.clip.background = Theme.palette.selectBackground;
            styles.clip.paddingTop = 0;

            if (this.props.user.id === clip.user.id)
                toolbar = <PostToolbar style={{padding: '10px 0 10px 0'}} post={clip}/>;
        } else
            styles.clip.paddingTop = 10;

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
            <HoverBox
                hoverStyle={{background: Theme.palette.selectBackground}}
                style={styles.clip}
                onClick={this.selectPost}>
                {toolbar}
                {content}
                <CommentSection ui={this.props.ui} user={this.props.user} post={clip}/>
            </HoverBox>
        );
    }
}