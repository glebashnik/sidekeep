import Router from '../shared/Router';
import UIStore from '../shared/stores/UIStore';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import * as Tracer from './Tracer';
import './controllers/UIController';
import './controllers/UserController';
import './controllers/FeedController';
import './controllers/ExportController';
import Actions from '../shared/Actions';
import './ContextMenu';

Tracer.init();
Router.initBackground();
UIStore.initBackground();
UserStore.initBackground();
FeedStore.initBackground();

chrome.browserAction.onClicked.addListener(() => {
    Actions.toggleSidebar();
});

