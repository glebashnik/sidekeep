import React from 'react';
import Theme from '../Theme'
import Avatar from '../Avatar'

export default class Like extends React.Component {
    static propTypes = {
        like: React.PropTypes.object.isRequired
    };

    render() {
        let like = this.props.like;

        let styles = {
            like: {
                display: 'flex',
                marginTop: 10,
                alignItems: 'center'
            },
            text: {
                font: Theme.font.primary,
                color: Theme.palette.textColor,
                marginLeft: 10
            },
            name: {
                font: Theme.font.accent,
                color: Theme.palette.primary2Color
            }
        };

        return (
            <div style={styles.like}>
                <Avatar name={like.user.name}/>
                <div style={styles.text}><span style={styles.name}>{like.user.name}</span>&nbsp;likes this</div>
            </div>
        );
    }
}