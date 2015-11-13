import _ from 'lodash';
import Actions from '../shared/Actions';
import TabController from './controllers/TabController';

chrome.contextMenus.create({
    title: 'Save to Aftersearch',
    contexts: ['selection', 'page', 'image'],
    onclick: (info, tab) => {
        if (info.selectionText) {
            if (tab.id !== -1) //normal page
                Actions.clipText(info.selectionText, tab.id);
            else {//pdf
                const tabId = TabController.getHighlightInfo().tabIds[0];
                Actions.clipText(info.selectionText, tabId);
            }
        }

        //else if (info.mediaType === 'image')
        //    Actions.clipImage(info.srcUrl, tab.id);
    }
});