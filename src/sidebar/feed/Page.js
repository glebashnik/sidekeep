import _ from 'lodash';
import React from 'react';
import Clip from './Clip';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import CommentSection from './CommentSection';
import HoverBox from '../ui/HoverBox';

class Page extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        page: React.PropTypes.object.isRequired,
        style: React.PropTypes.object
    };

    onClickContent = () => {
        Actions.selectPost(this.props.page.id);
    };

    onClickComment = () => {
        if (this.props.clip.id !== this.props.ui.selectedPostId)
            Actions.selectPost(this.props.page.id);
    };

    render() {
        const styles = {
            page: {
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
            },
            header: {
                padding: 10
            },
            content: {
                display: 'flex',
                alignItems: 'center',
                height: 24
            },
            icon: {
                width: 16,
                height: 16,
                marginRight: 11,
                flexShrink: 0
            },
            title: {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                color: Theme.palette.accentText,
                font: '400 14px Roboto',
                cursor: 'pointer'
            }
        };

        const page = this.props.page;
        const clips = _.reject(page.children, {type: 'comment'});

        if (page.id === this.props.ui.selectedPostId)
            styles.header.background = Theme.palette.selectBackground;

        const clipElems = clips
            ? clips.map((clip, index) => <Clip ui={this.props.ui} user={this.props.user} clip={clip} key={index}/>)
            : undefined;

        return (
            <div style={styles.page}>
                <HoverBox
                    style={styles.header}
                    hoverStyle={{background: Theme.palette.selectBackground}}>
                    <div style={styles.content} onClick={this.onClickContent}>
                        <img src={page.favIconUrl} style={styles.icon}/>
                        <HoverBox
                            style={styles.title}
                            hoverStyle={{textDecoration: 'underline'}}
                            onClick={this.openPage}>
                            {page.title}
                        </HoverBox>
                    </div>
                    <CommentSection onClick={this.onClickComment} ui={this.props.ui} user={this.props.user}
                                    post={page}/>
                </HoverBox>
                {clipElems}
            </div>
        );
    }
}

export default Page;