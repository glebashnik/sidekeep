import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Actions from '../../shared/Actions';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';

export default class ImageContent extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        clip: React.PropTypes.object.isRequired
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

    focusIcon = () => {
        this.setState({iconFocused: true});
    };

    blurIcon = () => {
        this.setState({iconFocused: false});
    };

    openImage = () => {
        Actions.openPage(this.props.clip.imageUrl);
    };

    render() {
        const styles = {
            content: {
                position: 'relative'
            },
            image: {
                maxHeight: 70,
                width: '100%',
                objectFit: 'cover'
            },
            icon: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: '#FEEABC'
            }
        };

        const clip = this.props.clip;

        const icon = (this.state.iconVisible || clip.id === this.props.ui.selectedPostId)
            ? <FontIcon
                style={styles.icon}
                className="material-icons"
                color={Theme.palette.icon}
                onMouseEnter={this.focusIcon}
                onMouseLeave={this.blurIcon}
                onClick={this.openImage}>
                    open_in_new
                </FontIcon>
            : null;

        return (
            <div
                style={styles.content}
                onMouseEnter={this.showIcon}
                onMouseLeave={this.hideIcon}>
                <img style={styles.image} src={clip.imageUrl}/>
                {icon}
            </div>
        );

    }
}