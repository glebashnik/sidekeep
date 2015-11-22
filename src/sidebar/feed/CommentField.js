import _ from 'lodash';
import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import Actions from '../../shared/Actions';

export default class CommentField extends React.Component {
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
                padding: '0 10px 5px 10px'
            },
            avatar: {
                margin: 0,
                flexShrink: 0
            },
            text: {
                marginLeft: 10,
                fontSize: 14
            }
        };

        return (
            <div style={styles.container}>
                <Avatar style={styles.avatar} src={this.props.user.image}/>
                <TextField
                    style={styles.text}
                    hintText="Comment"
                    multiLine={true}
                    ref="text"
                    onEnterKeyDown={this.add}/>
            </div>
        );
    }
}