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
                padding: '10px 10px 12px 10px'
            },
            header: {
                position: 'relative',
                marginTop: 3,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center'
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

        let sep1 = <div style={styles.sep1}>&#8942;</div>;
        let sep2 = <div style={styles.sep2}></div>;

        let clipElems;

        if (page.children)
            clipElems = page.children.map((clip, index) => {
                let clipE = <Clip clip={clip} key={index}/>;

                if (index > 0) {
                    let prev = page.children[index - 1];

                    if (!prev.children)
                        return [sep1, clipE];
                    else
                        return [sep2, clipE];
                }

                return clipE;
            });


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