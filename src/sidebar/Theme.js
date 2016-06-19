var Colors = require('material-ui/styles/colors');
var ColorManipulator = require('material-ui/utils/colorManipulator');
import Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.indigo500,
        primary2Color: Colors.indigo500,
        primary3Color: Colors.grey600,
        accent1Color: Colors.redA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey600,
        disabledColor: Colors.grey600,
        pickerHeaderColor: Colors.cyan500,
        clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),

        backgroundCard: 'white',
        backgroundFeed: '#EEEEEE',
        backgroundSelect: '#FDE09D',
        backgroundHover: '#FEF3DA',

        iconDark: Colors.grey600,
        iconLight: 'rgba(255, 255, 255, 0.65)',

        textDark: Colors.darkBlack,
        textLight: 'white',

        title: Colors.indigo700,
        border: Colors.grey300,
        time: Colors.grey600,
        user: Colors.indigo800
    },
    font: {
        toolbar: '400 16px Roboto',
        topic: '400 15px Roboto',
        title: '500 14px Roboto',
        user: '500 14px Roboto',

        snippet: '400 13px Noto Sans',
        comment: '400 13px Noto Sans',
        time: '400 11px Noto Sans'
    }
};
