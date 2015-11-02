import React from 'react';
import Theme from '../Theme'
import Avatar from 'material-ui/lib/avatar';
import Radium from 'radium';

@Radium class Like extends React.Component {
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
                color: Theme.palette.primary2Color,
                cursor: 'pointer',
                ':hover': {
                    textDecoration: 'underline'
                }
            }
        };

        return (
            <div style={styles.like}>
                <Avatar src={like.user.image}/>
                <div style={styles.text}><span style={styles.name}>{like.user.name}</span>&nbsp;likes this</div>
            </div>
        );
    }
}

export default Like;