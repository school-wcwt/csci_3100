import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Nunito',
            'Poppins',
            'sans-serif',
        ].join(','),
        h1: { fontFamily: 'Poppins' },
        h2: { fontFamily: 'Poppins' },
        h3: { fontFamily: 'Poppins' },
        h4: { fontFamily: 'Poppins' },
    },
    palette: {
        primary: {
            light: '#faf1f0',
            main: '#ee6a67',
            dark: '#b7393c',
            contrastText: '#707070',
        },
        secondary: {
            light: '#b4b4b4',
            main: '#707070',
            dark: '#404040',
            contrastText: '#f0f0f0',
        }
        /*secondary: {
            light: '#81f2ff',
            main: '#48bfd1',
            dark: '#008ea0',
            contrastText: '#1e1e1e',
        }*/
    },
    background: {
        default: '#fffdf5'
    }
})