import React from 'react';
import Theme from '../Theme';
var Colors = require('material-ui/styles/colors');

export default class Help extends React.Component {
    render() {
        const styles = {
            container: {
                padding: '25px 15px 20px 15px'
            },
            header: {
                font: '400 17px Roboto',
                color: Colors.grey700,
                marginBottom: 20
            },
            step: {
                marginBottom: 30
            },
            text: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            },
            number: {
                font: '400 30px Noto Sans',
                marginRight: 15,
                color: Theme.palette.primary1Color
            },
            description: {
                font: '400 13px Noto Sans'
            },
            img: {
                margin: '20px 0 0 30px',
                width: 200,
                border: '1px solid ' + Colors.grey300
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.header}>Getting Started</div>
                <div style={styles.step}>
                    <div style={styles.text}>
                        <div style={styles.number}>1</div>
                        <div style={styles.description}>Create a new topic or select an existing one.</div>
                    </div>
                    <img style={styles.img} src="images/topic.png"/>
                </div>
                <div style={styles.step}>
                    <div style={styles.text}>
                        <div style={styles.number}>2</div>
                        <div style={styles.description}>
                            Right (control) click on a selected text, an image, or an empty space and choose "Save to Sidekeep" in the context menu.
                        </div>
                    </div>
                    <img style={styles.img} src="images/clip.png"/>
                </div>
                <div style={styles.step}>
                    <div style={styles.text}>
                        <div style={styles.number}>3</div>
                        <div style={styles.description}>Export collected information to Google Doc.</div>
                    </div>
                    <img style={styles.img} src="images/export.png"/>
                </div>
            </div>
        );
    }
}