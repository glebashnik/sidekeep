import _ from 'lodash';
import React from 'react';

import NewFeed from './NewFeed';
import FeedItem from './FeedItem';

export default class FeedList extends React.Component {
    static propTypes = {
        feeds: React.PropTypes.object.isRequired
    };

    render() {
        const feeds = _.sortBy(_.values(this.props.feeds), 'name');

        return (
            <div>
                <NewFeed/>
                {feeds.map(feed => <FeedItem key={feed.id} feed={feed}/>)}
            </div>
        );
    }
}