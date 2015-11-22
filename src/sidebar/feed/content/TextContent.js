import React from 'react';
import * as HtmlHelper from '../../../shared/helpers/HtmlHelper';
import Theme from '../../Theme';
import Snippet from '../../ui/Snippet';

export default class TextContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    render() {
        let style = {
            font: Theme.font.content,
            color: Theme.palette.textColor,
            padding: 10
        };

        const maxLines = this.props.post.selected ? 100 : 4;

        return (
            <div style={style}>
                <Snippet maxLines={maxLines} text={HtmlHelper.strip(this.props.post.text)}/>
            </div>
        );
    }
}