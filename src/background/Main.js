import ActionRouter from '../shared/ActionRouter';
import UIStore from '../shared/stores/UIStore';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import Auth from './Auth';

UIStore.initBackground();
UserStore.initBackground();
FeedStore.initBackground();
ActionRouter.initBackground();

require('./controllers/UserController');
require('./controllers/ExportController');
require('./controllers/FeedController');
require('./controllers/UIController');
require('./Tracer');
require('./ContextMenu');

Auth.login();