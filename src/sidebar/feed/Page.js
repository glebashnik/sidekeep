import React from 'react';
import Radium from 'radium';
import HBox from '../ui/HBox';
import Clip from './Clip';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';

@Radium class Page extends React.Component {
    static propTypes = {
        page: React.PropTypes.object.isRequired,
        style: React.PropTypes.object
    };

    render() {
        let page = this.props.page;

        let styles = {
            page: {
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 10px 12px 10px',
                borderTop: '1px solid ' + Colors.grey300
            },
            header: {
                marginBottom: 10
            },
            icon: {
                width: 16,
                height: 16,
                marginRight: 11,
                flexShrink: 0,
                border: '1px solid ' + Theme.palette.accent2Color
            },
            title: {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                color: '#0066CC',
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
            }
        };

        let sep1 = <div style={styles.sep1}>&#8942;</div>;
        let sep2 = <div style={styles.sep2}/>;

        return (
            <div style={styles.page}>
                <HBox style={styles.header}>
                    <img src={page.favIconUrl} style={styles.icon}/>
                    <a href={page.url} target="_blank" style={styles.title}>{page.title}</a>
                </HBox>
                {page.clips.map((clip, index) => {
                    let clipE = <Clip clip={clip} key={index}/>;

                    if (index > 0) {
                        var prev = page.clips[index - 1];

                        if (!prev.comments && !prev.likes)
                            return [sep1, clipE];
                        else
                            return [sep2, clipE];
                    }

                    return clipE;
                })}
            </div>
        );
    }
}

export default Page;