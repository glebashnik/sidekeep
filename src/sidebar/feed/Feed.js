import _ from 'lodash';
import React from 'react';
import Post from './Post';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';
import Toolbar from './Toolbar';

export default class Feed extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        feed: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            feed: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                background: Theme.palette.background
            },
            posts: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                flexGrow: 1,
                paddingBottom: 10
            }
        };

        const posts = this.props.feed.children;
        let postElems;

        if (posts) {
            const sortedPosts = _.sortBy(posts, p => -p.timestamp);
            postElems = sortedPosts.map((post, index) => <Post user={this.props.user} ui={this.props.ui} post={post} key={index}/>);
        }

        return (
            <div style={styles.feed}>
                <Toolbar ui={this.props.ui} user={this.props.user} feed={this.props.feed}/>
                <div style={styles.posts}>
                    {postElems}
                </div>
            </div>
        );
    }
}