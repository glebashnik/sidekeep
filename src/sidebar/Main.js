import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../shared/Dispatcher';
import Store from '../shared/Store';
import Sidebar from './Sidebar';

Dispatcher.initContent();
Store.initContent();

const root = document.getElementById('react');
ReactDOM.render(<Sidebar/>, root);