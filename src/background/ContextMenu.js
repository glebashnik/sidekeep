import _ from 'lodash';
import Actions from '../shared/Actions';
import TabHelper from './helpers/TabHelper';

chrome.contextMenus.create({
    title: 'Save to Sidekeep',
    contexts: ['selection', 'page', 'image'],
    onclick: (info, tab) => {
        const tabId = tab.id !== -1 ? tab.id : TabHelper.getHighlightInfo().tabIds[0];

        if (info.selectionText)
            Actions.addText(info.selectionText, tabId);
        else if (info.mediaType === 'image')
            Actions.addImage(info.srcUrl, tabId);
        else
            Actions.addPage(tabId);
    }
});