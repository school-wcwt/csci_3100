import { darken, makeStyles } from '@material-ui/core/styles'
import { Avatar, ButtonBase, CardHeader, CardContent, Divider, IconButton } from '@material-ui/core';
import history from '../../../pages/history';
import global from '../../global';
import CancelIcon from '@material-ui/icons/Cancel';
import { DeleteForeverRounded } from '@material-ui/icons';

const commentFunc = require('../../load_backend/commentFunction');

const useStyles = makeStyles((theme) => ({
  commentHeader: {
    '& .MuiCardHeader-avatar':{
      marginRight: theme.spacing(1),
    },
    '& .MuiCardHeader-action':{
      alignSelf: 'center',
      margin: '-24px -8px',
    }
  },
  commentAvatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  commentContent: {
    paddingTop: theme.spacing(1)
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
}))

export default function Comment(props) {
  const classes = useStyles();
  return (   
    <>
    {props.post.comment.map((comment) => 
      <div key={comment.commentID}>
        <Divider/>
        <CardHeader className={classes.commentHeader}
          avatar={
          <Avatar variant='rounded' className={classes.commentAvatar}
            alt={comment.author.entityID} src={comment.author.profPhoto[0]}/>}
          title={
          <ButtonBase className={classes.infoEntityID} onClick = {()=>history.push(`/profile/${comment.author.entityID}`)}>
            <span>{comment.author.username}</span>
            <span className={classes.infoTag}>{`#${comment.author.tag}`}</span>
          </ButtonBase>}
          action={global.loginedUser.user.entityID == comment.author.entityID
            ? <IconButton onClick ={()=>{commentFunc.comment_delete(comment.commentID)}}>
                <DeleteForeverRounded />
              </IconButton>
            : null} />
        <CardContent className={classes.commentContent}>
          {comment.content}
          
        </CardContent>
      </div>
    )}
    </>
  )
}