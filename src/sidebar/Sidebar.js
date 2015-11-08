import React from 'react'
import Feed from './feed/Feed'
import Entrance from './Entrance'
import UserStore from '../shared/stores/UserStore'
import FeedStore from '../shared/stores/FeedStore'
import UIStore from '../shared/stores/UIStore'
import injectTapEventPlugin from 'react-tap-event-plugin';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from './Theme';
import Colors from 'material-ui/lib/styles/colors';

injectTapEventPlugin();

function getStateFromStores() {
    return {
        ui: UIStore.state,
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
        UIStore.addListener(this.onChange);
        UserStore.addListener(this.onChange);
        FeedStore.addListener(this.onChange);
    }

    componentWillUnmount() {
        UIStore.removeListener(this.onChange);
        UserStore.removeListener(this.onChange);
        FeedStore.removeListener(this.onChange);
    }

    render() {
        let style = {
            width: '100%',
            height: '100%',
            background: '#F1F1F1'
        };

        return <div style={style}><Feed ui={this.state.ui} user={this.state.user} feed={this.state.feed}/></div>;
    }
}

export default Sidebar;