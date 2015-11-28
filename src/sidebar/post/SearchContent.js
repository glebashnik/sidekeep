import _ from 'lodash';
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

import Theme from '../Theme';
import HoverBox from '../ui/HoverBox';
import Actions from '../../shared/Actions';

export default class SearchContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    openPage = (event) => {
        event.preventDefault();
        Actions.openPage(this.props.post.url);
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
                font: '500 14px Roboto',
                color: '#0066CC',
                cursor: 'pointer'
            }
        };

        return (
            <div style={styles.container}>
                <FontIcon
                    className="material-icons"
                    color={Colors.grey600}>
                    search
                </FontIcon>
                <HoverBox style={styles.query} hoverStyle={{textDecoration: 'underline'}} onClick={this.openPage}>
                    {this.props.post.query}
                </HoverBox>
            </div>
        );
    }
}