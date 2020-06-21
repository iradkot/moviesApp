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
    }
};

export default theme;
