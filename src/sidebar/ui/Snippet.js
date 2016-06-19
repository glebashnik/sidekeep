import React from 'react';
import QuoteIcon from './../icons/QuoteIcon';
import Colors from 'material-ui/styles/colors';

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
                color: Colors.grey600,
                width: 14,
                height: 10,
                marginRight: 5,
                marginBottom: 2
            }
        };

        Object.assign(styles.container, this.props.style);

        return (
            <div style={styles.container}>
                <QuoteIcon viewBox="0 0 14 10" style={styles.quote} color={styles.quote.color}/>
                {this.props.text}
            </div>
        );
    }
}