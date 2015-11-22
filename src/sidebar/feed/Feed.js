import _ from 'lodash';
import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';
import Card from './Card';

export default class Feed extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        posts: React.PropTypes.object.isRequired
    };

    render() {
        const style = {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            flexGrow: 1,
            paddingBottom: 15
        };

        const root = this.props.posts.root;
        let postElems;

        if (root) {
            const sorted = _.sortBy(root.children, p => -p.timestamp);
            postElems = _.map(sorted, (post, id) => <Card user={this.props.user} post={post} key={id}/>);
        }

        return (
            <div style={style}>
                {postElems}
            </div>
        );
    }
}