import _ from 'lodash';
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import HoverBox from '../ui/HoverBox';

export default class SearchContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px 10px 13px'
            },
            query: {
                marginLeft: 7,
                font: '400 14px Roboto',
                color: '#0066CC',
                cursor: 'pointer'
            }
        };

        return (
            <div style={styles.container}>
                <FontIcon
                    className="material-icons"
                    color={'#0066CC'}>
                    search
                </FontIcon>
                <div style={styles.query}>
                    {this.props.post.query}
                </div>
            </div>
        );
    }
}