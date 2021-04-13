//next: use filter
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import { IconButton, Card, CardMedia, CardContent, CardActions, 
         Collapse, InputBase, Divider } from '@material-ui/core';
import { FavoriteRounded, FavoriteBorderRounded, 
         AddCommentOutlined, AddCommentRounded,
         BookmarkBorderRounded, BookmarkRounded, } from '@material-ui/icons'
         
import Loading from '../loading'
import global from '../global'

import PostHeader from './component/PostHeader' 
import ImageDisplay from './component/ImageDisplay' 
import Hashtags from './component/Hashtags' 
import Comments from './component/Comments' 

const PostFunc = require('../load_backend/postFunction');

const useStyles = makeStyles((theme) => ({
  // Card
  wrapper: {
    display: 'flex',
    maxWidth: 600,
    margin: `2rem auto`,
    flexDirection: 'column',
    '& .MuiCard-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  footer: {
    justifyContent: 'space-between'
  },
  footerLike:{
    marginLeft: theme.spacing(1),
    fontWeight: '700',
  }
}))

const Post = (props) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const [favourite,setFavourite] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLike = () =>{
    //console.log(JSON.stringify(props.post.postID));
    setFavourite(!props.post.like.includes(global.loginedUser.user._id))
    PostFunc.post_like(props.post.postID,favourite) 
    .then(res=>{
      console.log("changed state in post ID "+ props.post.postID);
    })
  }
  if (global.loginedUser.user == null) return <Loading/>
  else return (                    
    <Card className={classes.wrapper} elevation={0}>
      <PostHeader {...props} />

      {props.post.photo.length !== 0
        ? <CardMedia><ImageDisplay {...props}/></CardMedia> : null}

      {props.post.hashtag && props.post.hashtag.length !== 0
        ? <Hashtags {...props} /> : null }

      <Divider/>
      <CardContent>{props.post.content}</CardContent>

      {props.post.comment 
        ? <Comments {...props}/> : null}

      <Divider/>
      <CardActions className={classes.footer}>
        <span className={classes.footerLike}>{`${props.post.like.length} likes`}</span>
        <div>
          <IconButton onClick={handleLike}>
            {props.post.like.includes(global.loginedUser.user._id)||favourite ? <FavoriteRounded/> : <FavoriteBorderRounded/>}
          </IconButton>
          <IconButton>
            {global.loginedUser.user.followingRest.includes(props.post.target._id) ? <BookmarkRounded/> : <BookmarkBorderRounded/>}
          </IconButton>
          <IconButton onClick={handleExpandClick}>
            {expanded ? <AddCommentRounded/> : <AddCommentOutlined/>}
          </IconButton>
        </div>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider/>
        <CardContent>
          <InputBase variant='filled' fullWidth multiline placeholder={`${global.loginedUser.user.username}'s comment`}></InputBase>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Post;