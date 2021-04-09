import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

var theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Nunito',
            'Poppins',
            'sans-serif',
        ].join(','),
        h1: { 
            fontFamily: 'Poppins',
            fontWeight: 700, 
        },
        h2: { 
            fontFamily: 'Poppins',
            fontWeight: 700, 
        },
        h3: { 
            fontFamily: 'Poppins',
            fontWeight: 700, 
        },
        h4: { 
            fontFamily: 'Poppins',
            fontWeight: 700, 
        },
        h5: { 
            fontFamily: 'Poppins',
            fontWeight: 700, 
        },
        h6: { 
            fontFamily: 'Poppins',
            fontWeight: 700, 
        },
    },
    palette: {
        primary: {
            light: '#faf1f0',
            main: '#ee6a67',
            dark: '#b7393c',
            contrastText: '#404040',
        },
        /*secondary: {
            light: '#b4b4b4',
            main: '#707070',
            dark: '#404040',
            contrastText: '#f0f0f0',
        }*/
        secondary: {
            light: '#81f2ff',
            main: '#48bfd1',
            dark: '#008ea0',
            contrastText: '#1e1e1e',
        },
        background: {
            default: '#fffdf5'
        }
    },

})

theme = responsiveFontSizes(theme);

export default theme;