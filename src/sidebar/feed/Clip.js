import React from 'react';
import * as HtmlHelper from '../../shared/helpers/HtmlHelper';

import Snippet from '../ui/Snippet';
import Actions from '../../shared/Actions';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';

import HoverBox from '../ui/HoverBox';
import ImageContent from './ImageContent';
import CommentSection from './CommentSection';

import FolderMoveIcon from '../ui/FolderMoveIcon'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import FontIcon from 'material-ui/lib/font-icon';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import FloatingMenuButton from './FloatingMenuButton';

export default class Clip extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        clip: React.PropTypes.object.isRequired
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

    onClickClip = () => {
        Actions.selectPost(this.props.clip.id);
    };

    stopPropagation = (e) => {
        if (this.props.clip.id === this.props.ui.selectedPostId)
            e.stopPropagation();
    };

    move = (e) => {
        this.stopPropagation(e);
    };

    remove = (e) => {
        this.stopPropagation(e);
        Actions.removePost(this.props.ui.selectedPostId);
    };

    render() {
        let styles = {
            clip: {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                padding: '15px 10px 10px 10px'
            },
            snippet: {
                font: Theme.font.content,
                color: Theme.palette.textColor
            },
            menu: {
                position: 'absolute',
                top: -18,
                right: 0,
                zIndex: 5
            },
            image: {
                maxHeight: 70,
                width: '100%',
                objectFit: 'cover'
            }
        };

        const clip = this.props.clip;
        const selected = clip.id === this.props.ui.selectedPostId;
        const hover = this.state.hover;

        if (hover)
            styles.clip.background = Theme.palette.hoverBackground;
        if (selected)
            styles.clip.background = Theme.palette.selectBackground;

        const maxLines = selected ? 100 : 4;

        let contentElem;

        switch (clip.type) {
            case 'text':
                contentElem = <Snippet maxLines={maxLines} text={HtmlHelper.strip(clip.text)} style={styles.snippet}/>;
                break;
            case 'image':
                contentElem = <ImageContent ui={this.props.ui} clip={clip}/>;
                break;
        }

        const menuElem = hover ?
            <IconMenu style={styles.menu} iconButtonElement={<FloatingMenuButton onClick={this.stopPropagation}/>}>
                <MenuItem onClick={this.move} primaryText="Move to topic"/>
                <MenuItem onClick={this.remove} primaryText="Remove from topic"/>
            </IconMenu> : undefined;

        return (
            <div
                style={styles.clip}
                onMouseEnter={this.enter}
                onMouseLeave={this.leave}
                onClick={this.onClickClip}>
                {menuElem}
                {contentElem}
                <CommentSection onClick={this.stopPropagation} ui={this.props.ui} user={this.props.user} post={clip}/>
            </div>
        );
    }
}