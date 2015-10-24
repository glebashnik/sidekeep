import Actions from '../shared/Actions';

chrome.contextMenus.create({
    title: 'Save to Aftersearch',
    contexts: ['selection', 'page', 'image'],
    onclick: function (info, tab) {
        if (info.selectionText)
            Actions.clipText(info.selectionText, tab.id);
        else if (info.mediaType === 'image')
            Actions.clipImage(info.srcUrl, tab.id);
    }
});