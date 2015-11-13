import React from 'react';
import Radium from 'radium';
import Clip from './Clip';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import PostMenu from './PostMenu';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';

@Radium
class Page extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        page: React.PropTypes.object.isRequired,
        style: React.PropTypes.object
    };

    state = {
        tools: false
    };

    render() {
        let page = this.props.page;

        let styles = {
            page: {
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 0 5px 0'
            },
            header: {
                position: 'relative',
                marginTop: 3,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                paddingRight: 10,
                paddingLeft: 10
            },
            icon: {
                width: 16,
                height: 16,
                marginRight: 11,
                flexShrink: 0,
                border: '1px solid ' + Colors.grey400
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
            },
            sep1: {
                fontSize: 14,
                textAlign: 'center',
                color: Colors.darkBlack
            },
            sep2: {
                height: 10
            },
            tools: {
                display: 'flex',
                background: Colors.darkWhite,
                position: 'absolute',
                bottom: -17,
                right: 0
            },
            toolsIcon: {
                color: Colors.grey500
            }
        };

        let tools;
        if (this.state.tools)
            tools = (
                <div style={styles.tools}>
                    <IconButton iconClassName="material-icons" iconStyle={styles.toolsIcon}>comment</IconButton>
                    <PostMenu post={this.props.page}/>
                </div>);

        let clipElems;

        if (page.children)
            clipElems = page.children.map((clip, index) =>
                <Clip ui={this.props.ui} user={this.props.user} clip={clip} key={index}/>);

        return (
            <div style={styles.page}>
                <div style={styles.header} onMouseEnter={this.enterHeader} onMouseLeave={this.leaveHeader}>
                    <img src={page.favIconUrl} style={styles.icon} />
                    <div style={styles.title} onClick={this.clickTitle}>{page.title}</div>
                    {tools}
                </div>
                {clipElems}
            </div>
        );
    }

    enterHeader = () => {
        this.setState({tools: true});
    };

    leaveHeader = () => {
        this.setState({tools: false});
    };

    clickTitle = () => {
        Actions.openPage(this.props.page.url);
    };
}

export default Page;