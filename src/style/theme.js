import { fontSizes, textDefault } from './consts';


const theme = {
    colors: {
        primary: '#19388A',
        primaryTransparent: (opacity = 0.5) => `rgba(25,56,138,${opacity})`,
        secondary: '#EE2D24',
    },
    text: {
        textDefault,
        fontSizes
    },
    spacing: {
        s: 4,
        m: 8,
        l: 16,
    },
};

export default theme;
