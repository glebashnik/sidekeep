import _ from 'lodash';
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from './Theme';
import Colors from 'material-ui/lib/styles/colors';
import Snackbar from 'material-ui/lib/snackbar';

import Store from '../shared/Store'
import Actions from '../shared/Actions';

import Toolbar from './Toolbar';
import Card from './post/Card';

injectTapEventPlugin();

class Sidebar extends React.Component {
    state = Store.state;

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        };
    }

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
                background: Theme.palette.backgroundFeed
            },
            feed: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                flexGrow: 1
            },
            entity: {
            }
        };

        const root = this.state.posts;
        let postElems;

        if (root) {
            const sorted = _.sortBy(root.children, p => -p.timestamp);
            postElems = _.map(sorted, (post, id) => <Card user={this.state.user} post={post} key={id}/>);
        }

        const snackbar = this.state.ui.notification ?
            <Snackbar
                message={
                    <div>
                        <span style={styles.entity}>{this.state.ui.notification.user}</span>
                        &nbsp;{this.state.ui.notification.text}&nbsp;
                        <span style={styles.entity}>{this.state.ui.notification.topic}</span>
                    </div>
                }
                onDismiss={Actions.dismissNotification}
                openOnMount/> : null;

        return (
            <div style={styles.container}>
                <Toolbar ui={this.state.ui} user={this.state.user} feeds={this.state.feeds}/>
                <div style={styles.feed}>
                    {postElems}
                </div>
                {snackbar}
            </div>
        );
    }
}

export default Sidebar;