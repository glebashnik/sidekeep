import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import QuoteIcon from '../icons/QuoteIcon';
import Theme from '../Theme';

export default class TextContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    render() {
        let styles = {
            container: {
                font: Theme.font.content,
                color: Theme.palette.textColor,
                padding: '10px 15px 10px 15px'
            },
            content: {
                display: '-webkit-box',
                overflow: 'hidden',
                wordWrap: 'break-word',
                WebkitLineClamp: this.props.post.selected ? 30 : 4,
                WebkitBoxOrient: 'vertical'
            },
            icon: {
                color: Colors.grey600,
                width: 12,
                height: 10,
                marginRight: 5,
                marginBottom: 2
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <QuoteIcon viewBox="0 0 14 10" style={styles.icon} color={styles.icon.color}/>
                    {this.props.post.text}
                </div>
            </div>
        );
    }
}