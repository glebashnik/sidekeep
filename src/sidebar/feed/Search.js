import React from 'react';
import VBox from '../ui/VBox';
import HBox from '../ui/HBox';
import Page from './Page';
import Theme from '../Theme';
import FontIcon from '../../../node_modules/material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Avatar from '../avatar';
import Radium from 'radium';

@Radium class Search extends React.Component {
    static propTypes = {
        search: React.PropTypes.object.isRequired
    };

    render() {
        let search = this.props.search;

        let styles = {
            header: {
                padding: '10px 10px 10px 7px',
                display: 'flex',
                alignItems: 'center'
            },
            query: {
                marginLeft: 8,
                font: '400 16px Roboto',
                color: '#0066CC',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 200,
                cursor: 'pointer',
                ':hover': {
                    textDecoration: 'underline'
                }
            },
            sep: {
                borderTop: '1px solid ' + Colors.grey300
            }
        };

        let sep = <div style={styles.sep}/>;

        return (
            <VBox>
                <HBox style={styles.header}>
                    <FontIcon className="material-icons" color={'#0066CC'}>search</FontIcon>
                    <span style={styles.query} href={search.url}>{search.query.toLowerCase()}</span>
                </HBox>
                {search.pages.map((page, index) => [sep, <Page page={page} key={index}/>])}
            </VBox>
        );
    }
}

export default Search;