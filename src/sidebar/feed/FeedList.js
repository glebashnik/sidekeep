import _ from 'lodash';
import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import FeedItem from './FeedItem';

export default class FeedList extends React.Component {
    static propTypes = {
        feeds: React.PropTypes.object.isRequired
    };

    render() {
        const feeds = _.sortBy(_.values(this.props.feeds), 'name');

        return (
            <div>
                {feeds.map(feed => <FeedItem key={feed.id} feed={feed}/>)}
            </div>
        );
    }
}