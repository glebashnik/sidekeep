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
                padding: '10px 10px 12px 10px'
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
                color: Theme.palette.primary2Color,
                font: Theme.font.accent,
                textDecoration: 'none',

                ':hover': {
                    textDecoration: 'underline'
                }
            }
        };

        return (
            <div style={[styles.page, this.props.style]}>
                <HBox>
                    <img src={page.favIconUrl} style={styles.icon}/>
                    <a href={page.url} target="_blank" style={styles.title}>{page.title}</a>
                </HBox>
                {page.clips.map((clip, index) => <Clip clip={clip} key={index}/>)}
            </div>
        );
    }
}

export default Page;