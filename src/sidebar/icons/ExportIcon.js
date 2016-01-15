import React from 'react';
import SvgIcon from 'material-ui/lib/svg-icon';

export default class extends React.Component {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M6,2C4.89,2 4,2.9 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13M8.93,12.22H16V19.29L13.88,17.17L11.05,20L8.22,17.17L11.05,14.35"/>
            </SvgIcon>
        )
    }
}