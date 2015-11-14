import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

Object.assign(Spacing, {
    desktopKeylineIncrement: 48
});

export default {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#2285CF',
        primary2Color: '#2285CF',
        primary3Color: '#4C97ED',
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey300,
        accent3Color: Colors.grey600,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey600,
        disabledColor: Colors.grey600,
        accentBackground: '#2285CF',
        accentForeground: 'white',
        accentText: '#2285CF',
        background: '#EEF2F5',
        icon: Colors.grey600
    },
    font: {
        primary: '400 13px Noto Sans',
        accent: '400 14px Roboto',
        content: '400 13px Noto Sans'
    }
};
