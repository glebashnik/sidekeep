import $ from 'jquery';
import Router from '../shared/Router'
import UIStore from '../shared/stores/UIStore'

Router.initContent();
UIStore.initContent();

let iframe = document.createElement('iframe');
document.documentElement.appendChild(iframe);
iframe.setAttribute('src', chrome.extension.getURL('sidebar.html'));
iframe.setAttribute('seamless', 'seamless');
$(iframe).css({
    position: 'fixed',
    top: '0',
    right: '0',
    width: '300px',
    height: '100%',
    border: '0',
    'z-index': 2147483647,
    boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 20px 0'
});

UIStore.addChangeListener(() => {
    $(iframe).css({
        display: UIStore.state.sidebarVisible ? 'block' : 'none'
    });
});


