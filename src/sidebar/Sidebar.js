import React from 'react'
import Feed from './feed/Feed'
import Entrance from './Entrance'
import UserStore from '../shared/stores/UserStore'
import FeedStore from '../shared/stores/FeedStore'
import injectTapEventPlugin from 'react-tap-event-plugin';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from './Theme';
import Colors from 'material-ui/lib/styles/colors';

injectTapEventPlugin();

function getStateFromStores() {
    return {
        user: UserStore.state,
        feed: FeedStore.state
    }
}

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
class Sidebar extends React.Component {
    state = getStateFromStores();

    onChange = () => {
        this.setState(getStateFromStores());
    };

    componentDidMount() {
        UserStore.addChangeListener(this.onChange);
        FeedStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.onChange);
        FeedStore.removeChangeListener(this.onChange);
    }

    render() {
        let style = {
            width: '100%',
            height: '100%',
            background: Colors.grey200
        };

        let main = this.state.feed.inside ?
            <Feed user={this.state.user} feed={this.state.feed}/> :
            <Entrance user={this.state.user} feed={this.state.feed}/>;

        return <div style={style}>{main}</div>;
    }
}

export default Sidebar;