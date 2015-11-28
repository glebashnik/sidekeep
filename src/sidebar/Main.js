import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../shared/Dispatcher';
import UIStore from '../shared/stores/UIStore';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import PostStore from '../shared/stores/PostStore';
import Sidebar from './Sidebar';

Dispatcher.initContent();
UIStore.initContent();
UserStore.initContent();
FeedStore.initContent();
PostStore.initContent();

const root = document.getElementById('react');
ReactDOM.render(<Sidebar/>, root);