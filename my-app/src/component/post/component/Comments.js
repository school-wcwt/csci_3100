import { darken, makeStyles } from '@material-ui/core/styles'
import { Avatar, ButtonBase, CardHeader, CardContent, Divider, IconButton } from '@material-ui/core';
import history from '../../../pages/history';
import global from '../../global';
import CancelIcon from '@material-ui/icons/Cancel';

const commentFunc = require('../../load_backend/commentFunction');

const useStyles = makeStyles((theme) => ({
  commentHeader: {
    paddingBottom: theme.spacing(1),
    '& .MuiCardHeader-avatar':{
      marginRight: theme.spacing(1),
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
  deletebutton:{
    justifyContent: "flex-end"
  }
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
          </ButtonBase>}/>
        <CardContent className={classes.commentContent}>
          {comment.content}
          {global.loginedUser.user.entityID == comment.author.entityID?
          <IconButton className = {classes.deletebutton} onClick ={()=>{commentFunc.comment_delete(comment.commentID)}}>
                    <CancelIcon />
          </IconButton>:
          null}
        </CardContent>
      </div>
    )}
    </>
  )
}