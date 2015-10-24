import _ from 'lodash'
import * as UrlHelper from '../shared/helpers/UrlHelper'

let traces = {};

export function init() {
    // Fired when visiting a new page
    chrome.webNavigation.onCommitted.addListener(details => {
        // Ignore subframes unless the user navigated within one manually
        if (details.transitionType == 'auto_subframe')
            return;

        addEvent(details.tabId, {
            type: details.transitionType,
            qualifiers: details.transitionQualifiers,
            timestamp: details.timeStamp,
            url: details.url
        });
    });

    //todo It doesn't seem to fire at all.
    // Fired when any HTTP request is made (used to detect AJAX searches)
    chrome.webRequest.onSendHeaders.addListener(details => {
            if (details.method != 'GET' || !UrlHelper.isSearch(details.url)) return;

            addEvent(details.tabId, {
                type: 'ajax',
                qualifiers: [],
                timestamp: details.timeStamp,
                url: details.url
            });
        },
        {urls: ['<all_urls>'], types: ['xmlhttprequest']});

    // Fired when using "Open in new Tab/Window"
    chrome.webNavigation.onCreatedNavigationTarget.addListener(details => {
        // Continue trace from original tab
        traces[details.tabId] = (traces[details.sourceTabId] || []).slice(0);
    });

    //chrome.webRequest.onCompleted.addListener(details => {
    //        if (details.method != 'GET' || !UrlHelper.isSearch(details.url)) return;
    //
    //        addEvent(details.tabId, {
    //            type: 'ajax',
    //            qualifiers: [],
    //            timestamp: details.timeStamp,
    //            url: details.url
    //        });
    //    },
    //    {urls: ['<all_urls>'], types: ['xmlhttprequest']});

    // Fired when using "Open in new Tab/Window"
    chrome.webNavigation.onCreatedNavigationTarget.addListener(details => {
        // Continue trace from original tab
        traces[details.tabId] = (traces[details.sourceTabId] || []).slice(0);
    });

    //Add title when tab loading completed
    chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
        let trace = traces[tabId] || [];

        if (info.status === "complete" && !_.isEmpty[trace] && tab !== undefined && trace.length > 0) {
            let last = _.last(trace);
            last.title = tab.title;
            last.url = tab.url;
            last.favIconUrl = tab.favIconUrl;
        }
    });
}

export function getTrace(tabId) {
    return traces[tabId] || [];
}

function isLongerSearch(event, last_event) {
    let query = UrlHelper.getSearchQuery(event.url);
    let last_query = UrlHelper.getSearchQuery(last_event.url);
    return query && last_query && query.indexOf(last_query) === 0;
}

function addEvent(tabId, event) {
    let trace = traces[tabId] || [];

    if (trace.length > 0) {
        let last_event = trace[trace.length - 1];

        if (isLongerSearch(event, last_event)) {
            trace[trace.length - 1] = event;
            return;
        }
    }

    traces[tabId] = trace.concat(event);
}
