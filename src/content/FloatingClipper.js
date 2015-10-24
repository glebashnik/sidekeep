import React from 'react';
import FloatingButton from './FloatingButton';
import * as RangeHelper from '../shared/helpers/RangeHelper';
import { clipSelection, clipElement } from './Clipping';
import $ from 'jquery';
import Actions from '../shared/Actions';

function isBackwards(selection) {
    var position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
    var result = false;

    // position == 0 if nodes are the same
    if (!position && selection.anchorOffset > selection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
        result = true;
    }

    return result;
}

function positionFromSelection(selection) {
    if (!selection || selection.isCollapsed)
        return null;

    var range = RangeHelper.clean(selection.getRangeAt(0));
    var rects = range.getClientRects();

    if (rects.length == 0)
        return null;

    var backwards = isBackwards(selection);
    var focusRect = backwards ? rects[0] : rects[rects.length - 1];

    if (backwards)
        return {
            top: window.scrollY + focusRect.top,
            left: window.scrollX + focusRect.left,
            above: true
        };
    else
        return {
            top: window.scrollY + focusRect.bottom,
            left: window.scrollX + focusRect.right,
            above: false
        };
}

function positionFromImage(image) {
    if (image === null)
        return null;

    var offset = $(image).offset();

    return {
        top: offset.top,
        left: offset.left,
        above: true
    };
}

function clipSelection() {
    if (document.getSelection().rangeCount > 0) {
        var range = document.getSelection().getRangeAt(0);
        var html = HtmlHelper.clean(extractHtmlFromRange(range));

        if (html.length > 0)
            Actions.
            CardActions.createSnippet(null, html, title, url, serializedRange);

        document.getSelection().empty();
    }
};

function extractHtmlFromRange(range) {
    var wrapper = document.createElement('div');
    wrapper.appendChild(range.cloneContents());
    return wrapper.innerHTML;
}

export default class FloatingClipper extends React.Component {
    state = {
        timer: null,
        image: null,
        selection: null
    };

    componentWillMount() {
        document.addEventListener('selectionchange', this.onChange);
        window.addEventListener('resize', this.onChange);
        document.addEventListener('mouseover', this.onMouseOver, true);
        this._onChange();
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.onChange);
        window.removeEventListener('resize', this._onChange);
        document.removeEventListener('mouseover', this._onMouseOver, true);
    }

    onChange = () => {
        var selection = window.getSelection();

        if (!selection.isCollapsed) {
            this.setState({selection: selection});
        } else {
            this.setState({selection: null});
        }
    };

    onMouseOver = (event) => {
        if (event.target.tagName == 'IMG') {
            var timer = window.setTimeout(this.onHoverImage, 300, event.target);

            this.setState({
                timer: timer
            });
        } else if (document.body && document.body.contains(event.target))
            this.clearHover();
    };

    onHoverImage = () => {
        this.setState({image: image, timer: null});
    };

    clearHover = () => {
        if (this.state.timer) {
            window.clearTimeout(this.state.timer);
        }

        this.setState({timer: null, image: null});
    };

    clip =() => {
        if (this.state.selection) {
            clipSelection('', document.title, document.URL);
        } else if (this.state.image) {
            clipElement(this.state.image);
        } else {
            throw new Error('Clipping with nothing targeted');
        }
    };

    render() {
        var position = positionFromSelection(this.state.selection) || positionFromImage(this.state.image);

        if (position === null) {
            return null;
        }

        return (
            <FloatingButton ref="button" top={position.top} left={position.left} above={position.above}
                            onClick={this.clip}/>
        );
    }
}
