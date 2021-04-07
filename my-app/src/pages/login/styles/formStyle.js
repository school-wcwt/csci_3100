import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({ 
    flexContainer:{
        width: '20rem',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
    },
    primaryButton: {
        margin: `1rem auto`,
        background: theme.palette.primary.main,
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: '1rem',
        letterSpacing: '2px',
        color: theme.palette.grey[200],
        '&:hover': {
            background: theme.palette.primary.dark,
        }
    },
    secondaryButton: {
        background: theme.palette.grey[400],
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: '1rem',
        letterSpacing: '2px',
        color: theme.palette.grey[700],
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-12px'
    },
    buttonWrapper: {
        width: '100%',
        position: 'relative',
    }
}));

export default style;