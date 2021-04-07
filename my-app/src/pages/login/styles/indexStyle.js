import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({ 
    viewPort: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    },
    background: {

    },
    logo: {
        display: 'block',
        margin: 'auto',
        width: '12rem'
    },
    header: {
        ...theme.typography.h3,
        color: theme.palette.primary.main,
        textAlign: 'center',
        padding: '1rem 6rem'
    },
}));

export default style;