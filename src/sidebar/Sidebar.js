import _ from 'lodash';
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from './Theme';
import Colors from 'material-ui/lib/styles/colors';

import Store from '../shared/Store'
import Actions from '../shared/Actions';

import Toolbar from './Toolbar';
import Card from './post/Card';

injectTapEventPlugin();

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
class Sidebar extends React.Component {
    state = Store.state;

    onChange = () => {
        this.setState(Store.state);
    };

    componentDidMount() {
        Store.addListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeListener(this.onChange);
    }

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                background: '#EEEEEE'
            },
            feed: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                flexGrow: 1
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