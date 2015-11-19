import React from 'react';
import Theme from '../Theme';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';

export default class FloatingMenuButton extends React.Component {
    render() {
        let styles = {
            area: {
                padding: 10
            },
            shadow: {
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                borderRadius: '50%',
                width: 20,
                height: 20
            },
            icon: {
                color: Theme.palette.primary1Color,
                right: 2,
                bottom: 2
            }
        };

        return (
            <div style={styles.area} {...this.props}>
                <div style={styles.shadow}>
                    <FontIcon
                        style={styles.icon}
                        color={styles.icon.color}
                        className="material-icons">
                        arrow_drop_down_circle
                    </FontIcon>
                </div>
            </div>
        );
    }
}