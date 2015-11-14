import React from 'react';
import Actions from '../../shared/Actions';
import Theme from '../Theme';
import FontIcon from 'material-ui/lib/font-icon';

export default class PostToolbar extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired,
        style: React.PropTypes.object
    };

    removePost = () => {
        Actions.removePost(this.props.post.id);
    };

    render() {
        const styles = {
            toolbar: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexGrow: 1
            },
            icon: {
                color: Theme.palette.icon
            }
        };

        const merged = Object.assign({}, styles.toolbar, this.props.style);

        return (
            <div style={merged}>
                <FontIcon
                    className="material-icons"
                    onClick={this.removePost}
                    color={Theme.palette.icon}>
                    delete
                </FontIcon>
            </div>
        );

    }
}