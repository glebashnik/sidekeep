import React from 'react';
import * as HtmlHelper from '../../shared/helpers/HtmlHelper';

import Snippet from '../ui/Snippet';
import Actions from '../../shared/Actions';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';

import ImageContent from './ImageContent';
import CommentSection from './CommentSection';

export default class Clip extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        clip: React.PropTypes.object.isRequired
    };

    selectClip = () => {
        if (this.props.clip.id === this.props.ui.selectedClipId)
            return;

        Actions.selectClip(this.props.clip.id);
    };

    render() {
        let styles = {
            clip: {
                padding: '10px 10px 10px 10px',
                cursor: 'pointer'
            },
            snippet: {
                font: Theme.font.content,
                color: Theme.palette.textColor
            }
        };

        let clip = this.props.clip;

        let maxLines = 4;

        if (clip.id === this.props.ui.selectedClipId) {
            maxLines = 100;
            styles.clip.background = '#FEEABC';
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
                <CommentSection ui={this.props.ui} user={this.props.user} post={clip}/>
            </div>
        );
    }
}