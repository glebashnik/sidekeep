import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

export default {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#3A539B',
        primary2Color: '#3A539B',
        primary3Color: Colors.grey600,
        accent1Color: Colors.pinkA200,
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
        backgroundToolbar: '#3A539B',
        backgroundSelect: '#FDE09D',
        backgroundHover: '#FEF3DA',

        iconDark: Colors.grey600,
        iconLight: 'white',

        textDark: Colors.darkBlack,
        textLight: 'white',
        textSnackbar: '#77CCFF',

        title: '#3A539B',
        border: Colors.grey400,
        time: Colors.grey600,
        user: '#3A539B'
    },
    font: {
        toolbar: '400 16px Roboto',
        title: '500 14px Roboto',
        snippet: '400 13px Noto Sans',
        user: '500 14px Roboto',
        comment: '400 13px Noto Sans',
        topic: '400 15px Roboto',
        time: '400 11px Noto Sans'
    }
};
