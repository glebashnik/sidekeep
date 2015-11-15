import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ActionRouter from '../shared/ActionRouter';
import UIStore from '../shared/stores/UIStore';
import UserStore from '../shared/stores/UserStore';
import FeedStore from '../shared/stores/FeedStore';
import Sidebar from './Sidebar';

ActionRouter.initContent();
UIStore.initContent();
UserStore.initContent();
FeedStore.initContent();

const root = document.getElementById('react');
ReactDOM.render(<Sidebar/>, root);