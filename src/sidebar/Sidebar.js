import _ from 'lodash';
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Theme from './Theme';
import Snackbar from 'material-ui/Snackbar';

import Store from '../shared/Store'
import Actions from '../shared/Actions';

import Toolbar from './Toolbar';
import Card from './post/Card';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500
    },
    appBar: {
        height: 50
    }
});


export default class Sidebar extends React.Component {
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
                background: Theme.palette.backgroundFeed
            },
            feed: {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                flexGrow: 1
            },
            entity: {}
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
            <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.container}>
                <Toolbar state={this.state}/>
                <div style={styles.feed}>
                    {postElems}
                </div>
                {snackbar}
            </div>
            </MuiThemeProvider>
        );
    }
}