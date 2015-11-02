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
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12)',
            borderRadius: 2
        };

        let post = this.props.post;

        return (
            <Paper zDepth={1} style={style}>
                {post.query === undefined
                    ? <Page page={post}/>
                    : <Search search={post}/>}
            </Paper>
        );
    }
}