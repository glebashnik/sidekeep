import _ from 'lodash';
import React from 'react';

import HoverIconButton from './ui/HoverIconButton';
import Colors from 'material-ui/lib/styles/colors';

import Theme from './Theme';
import FeedMenu from './feed/FeedMenu';
import Actions from '../shared/Actions';

export default class Toolbar extends React.Component {
    static propTypes = {
        state: React.PropTypes.object
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                zIndex: 5,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            content: {
                display: 'flex',
                zIndex: 7,
                width: '100%',
                background: Theme.palette.primary1Color,
                alignItems: 'center'
            },
            icon: {
                color: Theme.palette.iconLight
            },
            title: {
                font: Theme.font.toolbar,
                color: Theme.palette.textLight,
                flexGrow: 1,
                cursor: 'pointer',
                display: '-webkit-box',
                overflow: 'hidden',
                wordWrap: 'break-word',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
            }
        };

        const state = this.props.state;
        const selectedFeedId = state.user.selectedFeed;
        const selectedFeedName = selectedFeedId ? state.feeds[selectedFeedId].name : '';
        const feedMenuElem = state.ui.feedMenu ? <FeedMenu state={state}/> : null;

        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <HoverIconButton
                        onClick={Actions.toggleFeedMenu}
                        iconClassName="material-icons"
                        color={Theme.palette.iconLight}
                        hoverColor="white"
                        selectColor="white"
                        selected={state.ui.feedMenu}>
                        menu
                    </HoverIconButton>
                    <div style={styles.title} onClick={Actions.toggleFeedMenu}>{selectedFeedName}</div>
                    <HoverIconButton
                        onClick={Actions.toggleSidebar}
                        iconClassName="material-icons"
                        color={Theme.palette.iconLight}
                        hoverColor="white">
                        close
                    </HoverIconButton>
                </div>
                {feedMenuElem}
            </div>

        );
    }
}