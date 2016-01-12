import _ from 'lodash';

function toHTML(feed) {
    let html = '';
    html += '<h1>' + feed.name + '</h1>';
    _.forEach(feed.children, printPost);

    function printPost(post) {
        switch (post.type) {
            case 'search':
                html += '<h2><i>' + post.query + '</i></h2>';
                break;
            case 'page':
                html += '<h3>' + post.title + '</h3>';
                html += '<a href="' + post.url + '">' + post.url + '</a>';
                break;
            case 'text':
                html += '<br><p>' + post.text + '</p>';
                break;
            case 'comment':
                html += '<br><br><p>';
                html += '<b>' + post.user.name + '</b>&nbsp;';
                html += '<i>' + post.text + '</i>';
                html += '</p>';
                break;
            case 'image':
                html += '<br><br><img width="400" src="' + post.image + '">';
                break;
        }

        if (post.children)
            _.forEach(post.children, printPost);
    }

    return html;
}

let authorized;

function authorize() {
    if (!authorized)
        authorized = new Promise(resolve =>
            gapi.auth.authorize(
                {
                    'client_id': '845684901574-p8j67pm2h7l30qb1esii9ultirs1cm54.apps.googleusercontent.com',
                    'scope': 'https://www.googleapis.com/auth/drive.file',
                    'immediate': true
                }, resolve));

    return authorized;
}

function generateGoogleDoc(title, html) {
    return new Promise(resolve => {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        const params = {
            'uploadType': 'multipart',
            'convert': true
        };

        const headers = {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        };

        const contentType = 'text/html';

        const metadata = {
            'title': title,
            'mimeType': contentType
        };

        const body =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            '\r\n' +
            html +
            close_delim;

        const request = gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': params,
            'headers': headers,
            'body': body
        });

        request.execute(response => resolve(response.alternateLink));
    });
}

export default {
    exportFeedToGoogleDoc(feed) {
        const html = toHTML(feed);
        return authorize().then(() => generateGoogleDoc(feed.name, html));
    }
}