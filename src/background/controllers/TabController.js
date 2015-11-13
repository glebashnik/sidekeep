let _highlightInfo = null;

chrome.tabs.onHighlighted.addListener(highlightInfo => {
    _highlightInfo = highlightInfo;
});

export default {
    getHighlightInfo() {
        return _highlightInfo;
    }
}