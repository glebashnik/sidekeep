import React from 'react';
import VBox from '../ui/VBox';
import HBox from '../ui/HBox';
import Page from './Page';
import Theme from '../Theme';
import FontIcon from '../../../node_modules/material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Avatar from '../avatar';

export default class Search extends React.Component {
    static propTypes = {
        search: React.PropTypes.object.isRequired
    };

    render() {
        let search = this.props.search;

        let styles = {
            search: {
            },
            header: {
                padding: '10px 10px 10px 7px',
                display: 'flex',
                alignItems: 'center'
            },
            text: {
                marginLeft: 8,
                font: Theme.font.primary,
                color: Theme.palette.textColor
            },
            name: {
                font: Theme.font.accent,
                color: Theme.palette.primary2Color
            },
            query: {
                font: Theme.font.accent,
                color: Theme.palette.primary2Color,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 200
            },
            page: {
                borderTop: '1px solid ' + Colors.grey300
            }
        };

        return (
            <VBox style={styles.search}>
                <HBox style={styles.header}>
                    <Avatar name={search.user.name} style={styles.avatar}/>
                    <VBox style={styles.text}>
                        <div><span style={styles.name}>{search.user.name}</span>&nbsp;searched</div>
                        <span style={styles.query} href={search.url}>{search.query}</span>
                    </VBox>
                </HBox>
                <VBox>
                    {search.pages.map((page, index) => <Page page={page} style={styles.page} key={index}/>)}
                </VBox>
            </VBox>
        );
    }
}