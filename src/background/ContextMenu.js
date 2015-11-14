import _ from 'lodash';
import Actions from '../shared/Actions';
import TabController from './helpers/TabHelper';

chrome.contextMenus.create({
    title: 'Save to Aftersearch',
    contexts: ['selection', 'page', 'image'],
    onclick: (info, tab) => {
        const tabId = tab.id !== -1 ? tab.id : TabController.getHighlightInfo().tabIds[0];

        if (info.selectionText)
            Actions.clipText(info.selectionText, tabId);
        else if (info.mediaType === 'image')
            Actions.clipImage(info.srcUrl, tabId);
        else
            Actions.clipPage(tabId);
    }
});