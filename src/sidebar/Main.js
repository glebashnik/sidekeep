import React from 'react';
import Router from '../shared/Router';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import Sidebar from './Sidebar';

Router.initContent();
UserStore.initContent();
FeedStore.initContent();

React.render(<Sidebar/>, document.getElementById('react'));