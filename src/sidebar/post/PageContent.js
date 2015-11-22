import _ from 'lodash';
import React from 'react';
import Theme from '../Theme';
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
                padding: 10
            },
            icon: {
                width: 16,
                height: 16,
                marginRight: 11,
                flexShrink: 0
            },
            title: {
                width: 235,
                display: '-webkit-box',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: Theme.palette.accentText,
                font: '400 14px Roboto'
            }
        };

        const page = this.props.post;

        return (
            <div style={styles.container}>
                <img src={page.favIconUrl} style={styles.icon}/>
                <a href={page.url} style={styles.title} onClick={this.openPage}>{page.title}</a>
            </div>
        );
    }
}