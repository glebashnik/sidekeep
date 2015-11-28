import $ from 'jquery';
import Dispatcher from '../shared/Dispatcher'
import UIStore from '../shared/stores/UIStore'
import Actions from '../shared/Actions'

Dispatcher.initContent();
UIStore.initContent();

if (document.URL.indexOf('https://aftersearch.firebaseapp.com/join.html') === 0) {
    var feedId = "";
    var intervalId = null;

    function checker() {
        feedId = $('#feed').text();

        if(feedId != '') {
            Actions.joinFeed(feedId);
            clearTimeout(intervalId);
        }
    }

    intervalId = setTimeout(checker, 1000);
} else {
    const id = 'sidekeep';
    let iframe = document.getElementById(id);
    if (iframe)
        document.documentElement.removeChild(iframe);

    iframe = document.createElement('iframe');
    iframe.id = id;
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

    UIStore.addListener(() => {
        $(iframe).css({
            display: UIStore.state.sidebar ? 'block' : 'none'
        });
    });

    $(() => {
        $('body').click(() => {
            Actions.selectPost();
        });
    });
}


