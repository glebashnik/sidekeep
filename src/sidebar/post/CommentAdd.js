import _ from 'lodash';
import React from 'react';

import Avatar from 'material-ui/lib/avatar';
import Actions from '../../shared/Actions';
import TextField from 'material-ui/lib/text-field';

export default class CommentAdd extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        post: React.PropTypes.object.isRequired
    };

    add = (event) => {
        event.preventDefault();
        Actions.addComment(this.props.post.id, this.refs.text.getValue());
        this.refs.text.clearValue();
    };

    render() {
        let styles = {
            container: {
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px 5px 15px'
            },
            avatar: {
                margin: 0,
                flexShrink: 0,
                marginRight: 15
            }
        };

        return (
            <div style={styles.container}>
                <Avatar size={35} style={styles.avatar} src={this.props.user.image}/>
                <TextField
                    hintText="Comment"
                    multiLine={true}
                    ref="text"
                    onEnterKeyDown={this.add}/>
            </div>
        );
    }
}