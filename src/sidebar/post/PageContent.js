import React from 'react';

import Theme from '../Theme';
import HoverBox from '../ui/HoverBox'
import Actions from '../../shared/Actions';

export default class PageContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    openPage = (event) => {
        event.preventDefault();
        Actions.openPage(this.props.post.url);
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px 10px 15px'
            },
            icon: {
                width: 16,
                height: 16,
                marginRight: 15,
                flexShrink: 0
            },
            title: {
                width: 235,
                display: '-webkit-box',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: Theme.palette.title,
                font: Theme.font.title,
                textDecoration: 'none'
            }
        };

        const page = this.props.post;

        return (
            <div style={styles.container}>
                <img src={page.favIconUrl} style={styles.icon}/>
                <a href={page.url} style={styles.title} onClick={this.openPage}>
                    <HoverBox style={{textDecoration: 'none'}} hoverStyle={{textDecoration: 'underline'}}>
                        {page.title}
                    </HoverBox>
                </a>
            </div>
        );
    }
}