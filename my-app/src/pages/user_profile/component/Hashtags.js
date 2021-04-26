//next: use filter
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tags : {
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%'
  },
  col : {
    display: 'inline-flex',
    flexDirection: 'column',
    flex: 1,
    gap: theme.spacing(1),
  },
  tagButton: {
    borderRadius: 30,
    fontSize: '0.8rem',
    justifyContent: 'space-between',
    '&:disabled': {
      color: theme.palette.grey[700]
    },
  },
}))

export default function Hashtags(props) {
  const classes = useStyles();
  return (                    
    <CardContent className={classes.tags}>
      <div className={classes.col}>
      {props.hashtag.slice(0, props.limit/2).map((tag, i) => (
        <Button variant='outlined' fullWidth disabled className={classes.tagButton} key={`tag-${i}`}>
          <span>{`#${tag.name}`}</span>
          <span>{tag.frequency}</span> 
        </Button>))}
      </div>
      <div className={classes.col}>
      {props.hashtag.slice(props.limit/2, props.limit).map((tag, i) => (
        <Button variant='outlined' fullWidth disabled className={classes.tagButton} key={`tag-${i}`}>
          <span>{`#${tag.name}`}</span>
          <span>{tag.frequency}</span> 
        </Button>))}
      </div>
    </CardContent>
  )
}