import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Actions from '../../shared/Actions';
import Theme from '../Theme';

export default class PostToolbar extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    movePost = () => {

    };

    removePost = () => {
        Actions.removePost(this.props.post.id);
    };

    render() {
        const styles = {
            toolbar: {
                display: 'flex',
                justifyContent: 'flex-end',
                flexGrow: 1,
                marginRight: -10
            },
            icon: {
                color: Theme.palette.icon
            }
        };

        //<IconButton
        //    iconStyle={styles.icon}
        //    iconClassName="material-icons"
        //    tooltip="Move to..."
        //    touch={true}
        //    onClick={this.movePost}>
        //    folder
        //</IconButton>

        return (
            <div style={styles.toolbar}>
                <IconButton
                    iconStyle={styles.icon}
                    iconClassName="material-icons"
                    tooltip="Remove"
                    touch={true}
                    onClick={this.removePost}>
                    delete
                </IconButton>
            </div>
        );

    }
}