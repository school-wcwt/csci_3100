//next: use filter
import { darken, makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import { Avatar, IconButton, Button, ButtonBase, MobileStepper, 
         Card, CardHeader, CardMedia, CardContent, CardActions, 
         Collapse, InputBase, Divider } from '@material-ui/core';
import { FavoriteRounded, FavoriteBorderRounded, 
         AddCommentOutlined, AddCommentRounded,
         BookmarkBorderRounded, BookmarkRounded,
         StarBorderRounded, StarRounded, StarHalfRounded,
         KeyboardArrowRightRounded, KeyboardArrowLeftRounded
       } from '@material-ui/icons'
import Loading from '../loading'
import global from '../global'
import ImageDisplay from './component/ImageDisplay' 

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
  header: {
    '& .MuiCardHeader-action':{
      alignSelf: 'center',
      margin: '0px'
    },
    '& .MuiCardHeader-avatar':{
      marginRight: theme.spacing(1),
    }
  },
  footer: {
    justifyContent: 'space-between'
  },

  // Photo
  photoImg: {
    aspectRatio: 1,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    objectFit: 'contain',
    backgroundColor: darken(theme.palette.background.default, 0.05)
  },
  stepper: {
    backgroundColor: theme.palette.background.paper
  },

  // Tags
  tags : {
    display: 'inline-flex',
    gap: theme.spacing(1),
  },
  tagButton: {
    borderRadius: 30,
    fontSize: '0.8rem',
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

  // Comment
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

  // Footer
  footerLike:{
    marginLeft: theme.spacing(1),
    fontWeight: '700',
  }


}))

const Post = (props) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const renderComments = (
    <>
    {props.post.comment.map((comment) => 
      <div key={comment.commentID}>
        <Divider/>
        <CardHeader className={classes.commentHeader}
          avatar={
            <Avatar variant='rounded' className={classes.commentAvatar}
              alt={comment.author.entityID} src={comment.author.profPhoto[0]}/>}
          title={
            <ButtonBase className={classes.infoEntityID}>
                <span>{comment.author.username}</span>
                <span className={classes.infoTag}>{`#${comment.author.tag}`}</span>
            </ButtonBase>}/>
        <CardContent className={classes.commentContent}>{comment.content}</CardContent>
      </div>
    )}
    </>
  )

  if (global.loginedUser.user == null) return <Loading/>
  else return (                    
    <Card className={classes.wrapper} elevation={0}>

      <CardHeader className={classes.header}
        avatar={
          <Avatar variant='rounded' className={classes.avatar}
            alt={props.post.author.entityID} src={props.post.author.profPhoto[0]}/>}
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
          </div>}/>
      
      {props.post.photo.length !== 0 
      ? <CardMedia><ImageDisplay {...props}/></CardMedia>
      : null}

      <CardContent className={classes.tags}>
        {props.post.hashtag.map((tag, i) => (
          <Button variant='outlined' className={classes.tagButton} key={`tag-${i}`}>
            {`# ${tag.name}`}
          </Button>
        ))}
      </CardContent>

      <Divider/>

      <CardContent>
        {props.post.content}
      </CardContent>

      {renderComments}

      <Divider/>
      
      <CardActions className={classes.footer}>
        <span className={classes.footerLike}>{`${props.post.like.length} likes`}</span>
        <div>
          <IconButton>
            {props.post.like.includes(global.loginedUser.user._id) ? <FavoriteRounded/> : <FavoriteBorderRounded/>}
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