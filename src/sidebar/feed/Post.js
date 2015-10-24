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
            margin: '10px 10px 0 10px'
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