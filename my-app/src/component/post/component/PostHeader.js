import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ButtonBase, CardHeader,IconButton } from '@material-ui/core';
import history from '../../../pages/history';
import Rating from '../../Rating'
import CancelIcon from '@material-ui/icons/Cancel';
import global from '../../global';


const postFunc = require('../../load_backend/postFunction');
const useStyles = makeStyles((theme) => ({
  // Card
  header: {
    '& .MuiCardHeader-action': {
      alignSelf: 'center',
      margin: '0px'
    },
    '& .MuiCardHeader-avatar': {
      marginRight: theme.spacing(1),
    }
  },

  // Header
  infoAuthor: {
    display: 'flex',
  },
  infoDetail: {
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

  const renderDate = (time) => {
    const date = new Date(time);
    return <span className={classes.time}>{`${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('it-IT')}`}</span>
  }

  return (
    <CardHeader className={classes.header}
      avatar={
        <Avatar variant='rounded' alt={props.post.author.entityID}
          src={props.post.author.profPhoto[0]} />}
      title={
        <div className={classes.infoAuthor}>
          <ButtonBase className={classes.infoEntityID} onClick={() => history.push(`/profile/${props.post.author.entityID}`)}>
            <span>{props.post.author.username}</span>
            <span className={classes.infoTag}>{`#${props.post.author.tag}`}</span>
          </ButtonBase>
          <span className={classes.infoPostType}>{props.post.type ? 'reviewed' : 'checked-in at'}</span>
        </div>}
      subheader={
        <ButtonBase className={classes.infoEntityID} onClick={() => history.push(`/profile/${props.post.target.entityID}`)}>
          <span>{props.post.target.username}</span>
          <span className={classes.infoTag}>{`#${props.post.target.tag}`}</span>
        </ButtonBase>}
      action={
        <div className={classes.infoDetail}>
          {props.post.rating !== undefined ? <Rating rating={props.post.rating} /> : <Rating rating={0} />}
          {renderDate(props.post.createdTime)}
          {global.loginedUser.user.entityID == props.post.author.entityID ?
            <IconButton onClick={() => { postFunc.post_delete(props.post.postID)}}>
              Remove
            </IconButton> :
            null}


        </div>}
    />
  )
}