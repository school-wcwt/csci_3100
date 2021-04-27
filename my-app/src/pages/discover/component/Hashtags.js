import { makeStyles } from '@material-ui/core/styles';
import { Button, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tags : {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '100%'
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

/**
 * Generate HashTag Button UI
 * @param {Object} props 
 * @param {[ tag:{name:String, 
 *            frequency:number} ]} props.hashtag 
 * @return HashTag Buttons
 */
export default function Hashtags(props) {
  const classes = useStyles();
  return (                    
    <CardContent className={classes.tags}>
      {props.hashtag.slice(0, props.limit).map((tag, i) => (
        <Button variant='outlined' fullWidth disabled className={classes.tagButton} key={`tag-${i}`}>
          <span>{`#${tag.name}`}</span>
          <span>{tag.frequency}</span> 
        </Button>))}
    </CardContent>
  )
}