import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: `2rem auto`,
    padding: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(2, 0)
  },
  shared: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  twoCol: {
    flex: '1 0 45%',
  },
  slider: {
    width: '100%',
  },
  sharedTags: {
    flexWrap: 'wrap',
  },
  threeCol: {
    flex: '1 0 28%',
  },
  formType: {
    width: '7rem',
    margin: theme.spacing(1, 0, 0.5, 2),
    '& .MuiSelect-select': {
      paddingTop: '3px'
    }
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
  },
  button: {
    margin: `0.5rem auto`,
    background: theme.palette.primary.main,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    color: theme.palette.grey[200],
    '&:hover': {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    }
  },
}))