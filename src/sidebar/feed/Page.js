import _ from 'lodash';
import React from 'react';
import Radium from 'radium';
import Clip from './Clip';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import CommentSection from './CommentSection';

@Radium
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

    selectClip = () => {
        Actions.selectClip(this.props.page.id);
    };

    render() {
        const styles = {
            page: {
                display: 'flex',
                flexDirection: 'column'
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
                textDecoration: 'none',
                cursor: 'pointer',
                ':hover': {
                    textDecoration: 'underline'
                }
            }
        };

        const page = this.props.page;

        const clips = _.reject(page.children, {type: 'comment'});

        if (page.id === this.props.ui.selectedClipId)
            styles.header.background = '#FEEABC';

        const clipElems = clips
            ? clips.map((clip, index) =>
                <Clip ui={this.props.ui} user={this.props.user} clip={clip} key={index}/>)
            : undefined;

        return (
            <div style={styles.page}>
                <div style={styles.header} onClick={this.selectClip}>
                    <div style={styles.content}>
                        <img src={page.favIconUrl} style={styles.icon}/>
                        <div style={styles.title} onClick={this.openPage}>{page.title}</div>
                    </div>
                    <CommentSection ui={this.props.ui} user={this.props.user} post={page}/>
                </div>
                {clipElems}
            </div>
        );
    }
}

export default Page;