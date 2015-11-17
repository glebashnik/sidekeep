import React from 'react';
import QuoteIcon from 'material-ui/lib/svg-icons/editor/format-quote.js';
import Colors from 'material-ui/lib/styles/colors';

export default class Snippet extends React.Component {
    static propTypes = {
        text: React.PropTypes.string,
        maxLines: React.PropTypes.number.isRequired,
        style: React.PropTypes.object
    };

    static defaultProps = {
        maxLines: 1
    };

    render() {
        const styles = {
            container: {
                display: '-webkit-box',
                overflow: 'hidden',
                wordWrap: 'break-word',
                WebkitLineClamp: this.props.maxLines,
                WebkitBoxOrient: 'vertical'
            },
            quote: {
                transform: 'rotate(180deg)',
                color: Colors.grey600,
                marginBottom: -5
            }
        };

        Object.assign(styles.container, this.props.style);

        return (
            <div style={styles.container}>
                <QuoteIcon style={styles.quote} color={styles.quote.color}/>
                {this.props.text}
            </div>
        );
    }
}