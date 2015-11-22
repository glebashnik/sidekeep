import _ from 'lodash';
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from './Theme';
import Colors from 'material-ui/lib/styles/colors';

import UIStore from '../shared/stores/UIStore'
import UserStore from '../shared/stores/UserStore'
import FeedStore from '../shared/stores/FeedStore'
import PostStore from '../shared/stores/PostStore'
import Actions from '../shared/Actions';

import Toolbar from './Toolbar';
import Card from './post/Card'

injectTapEventPlugin();

function getStateFromStores() {
    return {
        ui: UIStore.state,
        user: UserStore.state,
        feeds: FeedStore.state,
        posts: PostStore.state
    }
}

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
class Sidebar extends React.Component {
    state = getStateFromStores();

    onChange = () => {
        this.setState(getStateFromStores());
    };

    componentDidMount() {
        UIStore.addListener(this.onChange);
        UserStore.addListener(this.onChange);
        FeedStore.addListener(this.onChange);
        PostStore.addListener(this.onChange);
    }

    componentWillUnmount() {
        UIStore.removeListener(this.onChange);
        UserStore.removeListener(this.onChange);
        FeedStore.removeListener(this.onChange);
        PostStore.removeListener(this.onChange);
    }

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                background: Theme.palette.background
            },
            feed: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                flexGrow: 1,
                paddingBottom: 10
            }
        };

        const root = this.state.posts.root;
        let postElems;

        if (root) {
            const sorted = _.sortBy(root.children, p => -p.timestamp);
            postElems = _.map(sorted, (post, id) => <Card user={this.state.user} post={post} key={id}/>);
        }

        return (
            <div style={styles.container}>
                <Toolbar ui={this.state.ui} user={this.state.user} feeds={this.state.feeds}/>
                <div style={styles.feed}>
                    {postElems}
                </div>
            </div>
        );
    }
}

export default Sidebar;