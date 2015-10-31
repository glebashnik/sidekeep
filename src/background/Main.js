import $ from 'jquery';
import Router from '../shared/Router';
import UIStore from '../shared/stores/UIStore';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import Actions from '../shared/Actions';

$(() => {
    Router.initBackground();
    UIStore.initBackground();
    UserStore.initBackground();
    FeedStore.initBackground();

    require('./controllers/UserController');
    require('./controllers/ExportController');
    require('./controllers/FeedController');
    require('./controllers/UIController');
    require('./Tracer');
    require('./ContextMenu');
});