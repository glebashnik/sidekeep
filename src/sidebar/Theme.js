import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

const spacing = Object.assign(Spacing, {
    desktopKeylineIncrement: 48
});

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.indigo500,
        primary2Color: Colors.indigo500,
        primary3Color: Colors,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey300,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey500,
        disabledColor: Colors.grey500
    },
    font: {
        primary: '400 13px Noto Sans',
        accent: '500 14px Roboto',
        content: '400 13px Noto Sans'
    }
};
