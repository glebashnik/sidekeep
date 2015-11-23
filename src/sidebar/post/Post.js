import _ from 'lodash';
import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import PageContent from './PageContent';
import SearchContent from './SearchContent';
import TextContent from './TextContent';
import ImageContent from './ImageContent';
import CommentContent from './CommentContent';

import PostMenu from './PostMenu';
import CommentAdd from './CommentAdd';
import Theme from '../Theme';

import Actions from '../../shared/Actions';

export default class Post extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        post: React.PropTypes.object.isRequired
    };

    state = {
        hover: false
    };

    enter = () => {
        this.setState({hover: true});
    };

    leave = () => {
        this.setState({hover: false});
    };

    select = () => {
        Actions.selectPost(this.props.post.id);
    };

    render() {
        let styles = {
            container: {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
            },
            content: {
                display: 'flex',
                flexDirection: 'column'
            },
            border: '1px solid ' + Colors.grey300
        };

        const {user, post} = this.props;
        let contentElem;

        switch (post.type) {
            case 'search':
                styles.container.borderTop = styles.border;
                contentElem = <SearchContent post={post}/>;
                break;
            case 'page':
                styles.container.borderTop = styles.border;
                contentElem = <PageContent post={post}/>;
                break;
            case 'text':
                contentElem = <TextContent post={post}/>;
                break;
            case 'image':
                contentElem = <ImageContent post={post}/>;
                break;
            case 'comment':
                contentElem = <CommentContent post={post}/>;
                break;
        }

        if (this.state.hover)
            styles.content.background = Theme.palette.hoverBackground;
        if (post.selected)
            styles.content.background = Theme.palette.selectBackground;

        const menuElem = this.state.hover ? <PostMenu post={post} style={{background: styles.content.background}}/> : undefined;
        const commentAddElem = post.selected ? <CommentAdd post={post} user={user}/> : undefined;

        const clips = _.reject(post.children, {type: 'comment'});
        const clipElems = _.map(clips, (clip, id) => <Post key={id} post={clip} user={user}/>);

        const comments = _.filter(post.children, {type: 'comment'});
        const commentElems = _.map(comments, (comment, id) => <Post key={id} post={comment} user={user}/>);

        return (
            <div style={styles.container}>
                <div style={styles.content} onMouseEnter={this.enter} onMouseLeave={this.leave} onClick={this.select}>
                    {menuElem}
                    {contentElem}
                    {commentAddElem}
                </div>
                {clipElems}
                {commentElems}
            </div>
        );
    }
}