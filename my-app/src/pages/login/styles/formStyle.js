import { makeStyles, fade } from "@material-ui/core/styles";

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
        margin: `0.5rem auto`,
        background: theme.palette.primary.main,
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: '1rem',
        letterSpacing: '2px',
        color: theme.palette.grey[200],
        '&:hover': {
            background: fade(theme.palette.common.white, 0.25),
        }
    },
    secondaryButton: {
        margin: `0.5rem auto`,
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: '1rem',
        letterSpacing: '2px',
        color: theme.palette.grey[700],
    },
    successButton: {
        margin: `0.5rem auto`,
        '&:disabled': {
            background: theme.palette.success.main,
            color: theme.palette.grey[200],
        },
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: '1rem',
        letterSpacing: '2px',
    },
    checkIcon: {
        fontSize: '1.75rem'
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