import _ from 'lodash';
import * as UrlHelper from './UrlHelper';

function removeChrome(trace) {
    return _.filter(trace, t => !_.include(t.url, '/_/chrome/newtab?'))
}

function removeLoops(trace) {
    var processed = [];

    _.forEach(trace, event => {
        var index = _.findIndex(processed, p => p.url === event.url);

        if (index !== -1)
            processed = _.take(processed, index + 1);
        else if (_.includes(event.qualifiers, 'forward_back'))
            processed = _.dropRight(processed, 1);
        else
            processed.push(event);
    });

    return processed;
}

function removeBeforeLastSearchOrTyped(trace) {
    var start = _.findLastIndex(trace, e => UrlHelper.isSearch(e.url) || e.type === 'typed');

    if (start !== -1)
        return _.slice(trace, start);

    return trace;
}

function fixEvent(event) {
    event.favIconUrl = 'https://www.google.com/s2/favicons?domain_url=' + encodeURIComponent(event.url);

    var query = UrlHelper.getSearchQuery(event.url);

    if (query)
        event.query = query;
}

export function fixTrace(trace) {
    var fixed = removeChrome(trace);
    fixed = removeBeforeLastSearchOrTyped(fixed);
    //fixed = removeLoops(fixed);
    fixed.forEach(fixEvent);
    return fixed;
}