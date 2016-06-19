import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Colors from 'material-ui/styles/colors';
import Actions from '../../shared/Actions';
import Theme from '../Theme';

export default class ImageContent extends React.Component {
    static propTypes = {
        post: React.PropTypes.object.isRequired
    };

    state = {
        iconVisible: false,
        iconFocused: false
    };

    showIcon = () => {
        this.setState({iconVisible: true});
    };

    hideIcon = () => {
        this.setState({iconVisible: false});
    };

    openImage = () => {
        Actions.openPage(this.props.post.image);
    };

    render() {
        const styles = {
            container: {
                position: 'relative',
                padding: '10px 15px 10px 15px'
            },
            image: {
                maxHeight: 70,
                width: '100%',
                objectFit: 'cover',
                border: '1px solid ' + Colors.grey600
            },
            icon: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 5
            }
        };

        const post = this.props.post;

        const icon = this.state.iconVisible
            ? <FontIcon
            style={styles.icon}
            className="material-icons"
            color={Theme.palette.iconDark}
            onClick={this.openImage}>
            open_in_new</FontIcon>
            : null;

        styles.icon.background = post.selected ? Theme.palette.backgroundSelect : Theme.palette.backgroundHover;

        return (
            <div
                style={styles.container}
                onMouseEnter={this.showIcon}
                onMouseLeave={this.hideIcon}>
                <img style={styles.image} src={post.image}/>
                {icon}
            </div>
        );
    }
}