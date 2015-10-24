import QueryString from 'query-string';

function parseQueryString(url) {
    let queryString = QueryString.extract(url);
    let [main, hash] = queryString.split('#');
    return {
        main: QueryString.parse(main),
        hash: QueryString.parse(hash)
    }
}

export function getSearchQuery(url) {
    let parsed = parseQueryString(url);
    return parsed.hash.q || parsed.main.q || '';
}

export function isSearch(url) {
    return getSearchQuery(url).length > 0;
}

export function isSameUrl(url1, url2) {
    const query1 = getSearchQuery(url1);
    const query2 = getSearchQuery(url2);
    return url1 === url2 || (query1 !== undefined && query1 === query2);
}