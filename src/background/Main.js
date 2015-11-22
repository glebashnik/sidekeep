import ActionRouter from '../shared/ActionRouter';
import UIStore from '../shared/stores/UIStore';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import PostStore from '../shared/stores/PostStore';
import Auth from './Auth';

UIStore.initBackground();
UserStore.initBackground();
FeedStore.initBackground();
PostStore.initBackground();
ActionRouter.initBackground();

require('./controllers/UserController');
require('./controllers/FeedController');
require('./controllers/PostController');
require('./controllers/ExportController');
require('./controllers/UIController');
require('./helpers/TabHelper');
require('./Tracer');
require('./ContextMenu');

Auth.login();