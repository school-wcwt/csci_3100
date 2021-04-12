import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ButtonBase, CardHeader } from '@material-ui/core';
import { StarBorderRounded, StarRounded, StarHalfRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  // Card
  header: {
    '& .MuiCardHeader-action':{
      alignSelf: 'center',
      margin: '0px'
    },
    '& .MuiCardHeader-avatar':{
      marginRight: theme.spacing(1),
    }
  },

  // Header
  infoAuthor: {
    display: 'flex',
  },
  infoDetail : {
    fontFamily: 'Poppins',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px'
  },
  infoEntityID: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: theme.palette.primary.main,
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1)
  },
  infoTag: {
    fontFamily: 'Poppins',
    color: theme.palette.grey[400],
  },
  infoPostType: {
    fontFamily: 'Poppins',
    color: theme.palette.grey[700],
  },
  time: {
    fontSize: '0.7rem',
    color: theme.palette.grey[400],
  },
}))

export default function PostHeader(props) {
  const classes = useStyles();

  const renderRating = (() => {
    const rating = props.post.rating !== undefined ? props.post.rating : 0;
    const fullStars = ~~(rating/2);
    const halfStars = rating % 2;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <div>
        {[...Array(fullStars)].map((x, i)  => <StarRounded key={`star-${i}`}/>)}
        {halfStars ? <StarHalfRounded key={`star-${fullStars}`}/> : null}
        {[...Array(emptyStars)].map((x, i) => <StarBorderRounded key={`star-${i-emptyStars+5}`}/>)}
      </div>
    ) 
  })()

  const renderDate = (() => {
    const date = new Date(props.post.createdTime);
    return <span className={classes.time}>{`${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('it-IT')}`}</span>
  })()

  return (
    <CardHeader className={classes.header}
      avatar={
        <Avatar variant='rounded' alt={props.post.author.entityID} 
          src={props.post.author.profPhoto[0]}/>}
      title={
        <div className={classes.infoAuthor}>
          <ButtonBase className={classes.infoEntityID}>
            <span>{props.post.author.username}</span>
            <span className={classes.infoTag}>{`#${props.post.author.tag}`}</span>
          </ButtonBase>
          <span className={classes.infoPostType}>{props.post.type ? 'checked-in at' : 'reviewed'}</span>
        </div>}
      subheader={
        <ButtonBase className={classes.infoEntityID}>
          <span>{props.post.target.username}</span>
          <span className={classes.infoTag}>{`#${props.post.author.tag}`}</span>
        </ButtonBase>}
      action={
        <div className={classes.infoDetail}>
          {renderRating}
          {renderDate}
        </div>}
    />
  )
}