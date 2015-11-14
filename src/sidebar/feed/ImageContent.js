import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Actions from '../../shared/Actions';
import Colors from 'material-ui/lib/styles/colors';
import Theme from '../Theme';

export default class ImageContent extends React.Component {
    state = {
        iconFocused: false
    };

    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        clip: React.PropTypes.object.isRequired
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

        const iconColor = this.state.iconFocused
            ? Theme.palette.primary1Color
            : Colors.grey500;

        const icon = clip.id === this.props.ui.selectedClipId
            ? <FontIcon
                style={styles.icon}
                className="material-icons"
                color={iconColor}
                onMouseEnter={this.focusIcon}
                onMouseLeave={this.blurIcon}
                onClick={this.openImage}>
                    open_in_new
                </FontIcon>
            : null;

        return (
            <div style={styles.content}>
                <img style={styles.image} src={clip.imageUrl}/>
                {icon}
            </div>
        );

    }
}