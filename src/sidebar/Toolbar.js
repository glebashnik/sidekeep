import _ from 'lodash';
import React from 'react';

import HoverIconButton from './ui/HoverIconButton';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';

import Theme from './Theme';
import FeedMenu from './feed/FeedMenu';
import Actions from '../shared/Actions';

export default class Toolbar extends React.Component {
    static propTypes = {
        state: React.PropTypes.object
    };

    search = (e) => {
        Actions.search(e.target.value);
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                zIndex: 5,
                minHeight: 48,
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
        const selectedFeedName = selectedFeedId ? state.feeds[selectedFeedId].name : 'Click to select a topic';
        const menuElem = state.ui.menu ? <FeedMenu state={state}/> : null;
        const closeButton = (
            <HoverIconButton
                onClick={Actions.toggleSidebar}
                iconClassName="material-icons"
                color={Theme.palette.iconLight}
                hoverColor="white">
                close
            </HoverIconButton>
        );

        // const searchButton = <HoverIconButton
        //     style={{marginRight: -10}}
        //     onClick={Actions.openSearch}
        //     iconClassName="material-icons"
        //     color={Theme.palette.iconLight}
        //     hoverColor="white">
        //     search
        // </HoverIconButton>;
        const searchButton = null;

        const contentElem = state.ui.search
            ? (
            <div style={styles.content}>
                <HoverIconButton
                    onClick={Actions.closeSearch}
                    iconClassName="material-icons"
                    color={Theme.palette.iconLight}
                    hoverColor="white"
                    selectColor="white"
                    selected={state.ui.menu}>
                    arrow_back
                </HoverIconButton>
                <TextField onChange={this.search}
                           ref="searchField"
                           hintText="Search"
                           hintStyle={{color: Colors.lightWhite}}
                           inputStyle={{color: 'white'}}
                           underlineStyle={{borderColor: 'white'}}
                           underlineFocusStyle={{borderColor: 'white'}}/>
                {closeButton}
            </div>
        ) : (
            <div style={styles.content}>
                <HoverIconButton
                    onClick={Actions.toggleMenu}
                    iconClassName="material-icons"
                    color={Theme.palette.iconLight}
                    hoverColor="white"
                    selectColor="white"
                    selected={state.ui.menu}>
                    menu
                </HoverIconButton>
                <div style={styles.title} onClick={Actions.toggleMenu}>{selectedFeedName}</div>
                {searchButton}
                {closeButton}
            </div>
        );

        return (
            <div style={styles.container}>
                {contentElem}
                {menuElem}
            </div>

        );
    }
}