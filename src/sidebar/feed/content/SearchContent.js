import _ from 'lodash';
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import HoverBox from '../../ui/HoverBox';

export default class SearchContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    render() {
        const styles = {
            container: {
                display: 'flex',
                alignItems: 'center',
                padding: 10
            },
            query: {
                marginLeft: 8,
                font: '400 16px Roboto',
                color: '#0066CC',
                cursor: 'pointer'
            },
            queryHover: {
                textDecoration: 'underline'
            }
        };

        return (
            <div style={styles.container}>
                <FontIcon
                    className="material-icons"
                    color={'#0066CC'}>
                    search
                </FontIcon>
                <HoverBox
                    style={styles.query}
                    hoverStyle={styles.queryHover}
                    href={this.props.post.url}>
                    {this.props.post.query}
                </HoverBox>
            </div>
        );
    }
}