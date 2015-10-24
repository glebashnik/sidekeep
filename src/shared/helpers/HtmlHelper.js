function cleanAttributes(node) {
    for(var i = 0; i < node.attributes.length; ++i) {
        node.removeAttribute(node.attributes[i].name);
        --i;
    }
}

function cleanChildren(parent) {
    for(var i = 0; i < parent.childNodes.length; ++i) {
        var node = parent.childNodes[i];

        if(node.nodeType == Node.ELEMENT_NODE) {
            switch(node.tagName) {
                // These are the tags we want to keep
                case 'BR':
                case 'LI':
                case 'OL':
                case 'P':
                case 'PRE':
                case 'UL':
                    cleanAttributes(node);
                    cleanChildren(node);
                    break;
                // These are the tags we don't want
                case 'SCRIPT':
                case 'STYLE':
                    parent.removeChild(node);
                    --i;
                    break;
                // The remaining tags, we remove but keep their content
                default:
                    while(node.childNodes.length > 0) {
                        parent.insertBefore(node.firstChild, node);
                    }
                    parent.removeChild(node);
                    --i;
            }
        }
    }
}

export function clean(html) {
    var snippet = document.createElement('div');
    snippet.innerHTML = html;

    cleanChildren(snippet);

    return snippet.innerHTML;
}

export function strip(html) {
    var snippet = document.createElement('div');
    snippet.innerHTML = html;
    return snippet.innerText;
}