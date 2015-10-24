function length(node) {
    switch (node.nodeType) {
    case Node.ELEMENT_NODE:
        return node.childNodes.length;
    case Node.TEXT_NODE:
        return node.length;
    default:
        throw new Error('Unexpected node type');
    }
}

export function clean(range) {
    var result = range.cloneRange();

    while (result.startContainer.parentNode && result.startOffset == length(result.startContainer)) {
        result.setStartAfter(result.startContainer);
    }

    while (result.endContainer.parentNode && result.endOffset == 0) {
        result.setEndBefore(result.endContainer);
    }

    return result;
}
