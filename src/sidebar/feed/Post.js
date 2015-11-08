import React from 'react';
import Page from './Page';
import Search from './Search';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';

export default class Post extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    render() {
        let style = {
            margin: '10px 10px 0 10px',
            background: 'white',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.12)'
        };

        let post = this.props.post;

        let postElem;

        switch(post.type) {
            case 'search':
                postElem = <Search search={post}/>;
                break;
            case 'page':
                postElem = <Page page={post}/>;
                break;
        }

        return (
            <div style={style}>{postElem}</div>
        );
    }
}