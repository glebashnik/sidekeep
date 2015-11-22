import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';
import Post from './Post';

export default class Card extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        post: React.PropTypes.object.isRequired
    };

    render() {
        let style = {
            margin: '15px 5px 0 10px',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        };

        return (
            <div style={style}><Post user={this.props.user} post={this.props.post}/></div>
        );
    }
}