import _ from 'lodash';
import React from 'react';
import Clip from './Clip';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import CommentSection from './CommentSection';
import HoverBox from '../ui/HoverBox';
import PostToolbar from './PostToolbar';

class Page extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        page: React.PropTypes.object.isRequired,
        style: React.PropTypes.object
    };

    openPage = () => {
        Actions.openPage(this.props.page.url);
    };

    selectPost = () => {
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
                alignItems: 'center'
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
        let toolbar;

        if (page.id === this.props.ui.selectedPostId) {
            styles.header.paddingTop = 0;
            styles.header.background = '#FEEABC';

            if (this.props.user.id === page.user.id)
                toolbar = <PostToolbar post={page}/>;
        } else
            styles.header.paddingTop = 10;

        const clipElems = clips
            ? clips.map((clip, index) =>
                <Clip ui={this.props.ui} user={this.props.user} clip={clip} key={index}/>)
            : undefined;

        return (
            <div style={styles.page}>
                <HoverBox
                    style={styles.header}
                    hoverStyle={{background: '#FEEABC'}}
                    onClick={this.selectPost}>
                    <div style={styles.content}>
                        <img src={page.favIconUrl} style={styles.icon}/>
                        <HoverBox
                            style={styles.title}
                            hoverStyle={{textDecoration: 'underline'}}
                            onClick={this.openPage}>
                            {page.title}
                        </HoverBox>
                        {toolbar}
                    </div>
                    <CommentSection ui={this.props.ui} user={this.props.user} post={page}/>
                </HoverBox>
                {clipElems}
            </div>
        );
    }
}

export default Page;