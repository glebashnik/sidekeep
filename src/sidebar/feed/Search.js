import _ from 'lodash';
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';
import Page from './Page';
import CommentSection from './CommentSection';
import Actions from '../../shared/Actions';
import HoverBox from '../ui/HoverBox';

class Search extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        search: React.PropTypes.object.isRequired
    };

    onClickHeader = () => {
        Actions.selectPost(this.props.search.id);
    };

    onClickComment = (e) => {
        if (this.props.search.id === this.props.ui.selectedPostId)
            e.stopPropagation();
    };

    render() {
        const styles = {
            search: {
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
            },
            header: {
                padding: 10
            },
            content: {
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
                cursor: 'pointer'
            },
            sep: {
                borderTop: '1px solid ' + Colors.grey300
            }
        };

        const search = this.props.search;
        const pages = _.reject(search.children, {type: 'comment'});

        if (search.id === this.props.ui.selectedPostId)
            styles.header.background = Theme.palette.selectBackground;

        const pageElems = pages
            ? pages.map((page, index) => [
            <div style={styles.sep}/>,
            <Page user={this.props.user} ui={this.props.ui} page={page} key={index}/>])
            : undefined;

        return (
            <div style={styles.search}>
                <HoverBox
                    style={styles.header}
                    hoverStyle={{background: Theme.palette.hoverBackground}}
                    onClick={this.onClickHeader}>
                    <div style={styles.content}>
                        <FontIcon
                            className="material-icons"
                            color={'#0066CC'}>
                            search
                        </FontIcon>
                        <HoverBox
                            style={styles.query}
                            hoverStyle={{textDecoration: 'underline'}}
                            href={search.url}>
                            {search.query}
                        </HoverBox>
                    </div>
                    <CommentSection
                        onClick={this.onClickComment}
                        user={this.props.user}
                        ui={this.props.ui}
                        post={search}/>
                </HoverBox>
                {pageElems}
            </div>
        );
    }
}

export default Search;