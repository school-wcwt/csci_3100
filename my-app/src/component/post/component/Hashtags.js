//next: use filter
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tags : {
    display: 'inline-flex',
    gap: theme.spacing(1),
  },
  tagButton: {
    borderRadius: 30,
    fontSize: '0.8rem',
  },
}))

export default function Hashtags(props) {
  const classes = useStyles();
  return (                    
    <CardContent className={classes.tags}>
      {props.post.hashtag.map((tag, i) => (
        <Button variant='outlined' className={classes.tagButton} key={`tag-${i}`}>{`# ${tag.name}`}</Button>))}
    </CardContent>
  )
}