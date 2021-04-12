import { Avatar, Button, Divider, makeStyles, Typography, IconButton, Popover, CssBaseline } from "@material-ui/core";
import { LocationOnRounded, PhoneRounded, PhoneDisabledRounded, AlarmRounded, AlarmOffRounded } from '@material-ui/icons'
import Rating from '../../component/Rating'
import global from '../../component/global'
import Posts from '../../component/post/posts'
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import Error404 from "../../component/Error404";
import Loading from "../../component/loading";
import axios from '../../axiosConfig'
import NavBar from '../main/component/nav'
import history from '../history'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 600,
    margin: `2rem auto`,
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  avatar: {
    width: '8rem',
    height: '8rem'
  },
  infoRoot: {
    display: 'flex',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoItemButton: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
  },
  infoItemText: {
    fontWeight: '700',
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverPaper:{
    padding: theme.spacing(1)
  },
  actionRoot:{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  actionPrimaryButton: {
    width: '100%',
    margin: 'auto',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    color: theme.palette.grey[200],
    '&:hover': {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
  },
  actionSecondaryButton: {
    width: '290px',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    alignSelf: 'center',
  }
}))

const UserInfo = (props) => {
  const classes = useStyles()
  const renderItem = (name, count) => {
    return (
      <div className={classes.infoItem}>
        <Button className={classes.infoItemButton}>{count}</Button>
        <span className={classes.infoItemText}>{name}</span>
      </div>
    )
  }
  return (
    <div className={classes.infoRoot}>
      {renderItem('Posts', props.user.post.length)}
      <Divider orientation='vertical' variant='middle' flexItem/>
      {renderItem('Followed', props.user.followed.length)}
      <Divider orientation='vertical' variant='middle' flexItem/>
      {renderItem('Following User', props.user.followingUser.length)}
      <Divider orientation='vertical' variant='middle' flexItem/>
      {renderItem('Following Restaurants', props.user.followingRest.length)}
    </div>
  )
}

const RestInfo = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.infoRoot}>
      <IconButton>
        <LocationOnRounded/>
      </IconButton>
      {props.rest.phone 
        ? <IconButton>
            <PhoneRounded/>
          </IconButton>
        : <IconButton disabled>
            <PhoneDisabledRounded/>
          </IconButton>}
      {props.rest.openingHr && props.rest.openingHr.length !== 0
        ? <IconButton>
            <AlarmRounded/>
          </IconButton>
        : <IconButton disabled>
            <AlarmOffRounded/>
          </IconButton>}
    </div>
  )
}

const UserActions = (props) => {
  const classes = useStyles()
  const followed = global.loginedUser.user.followingUser.includes(props.user._id);
  const isSelf = global.loginedUser.user.entityID == props.user.entityID;
  const hasGroupList = props.user.groupList.length !== 0
  return (
    <div className={classes.actionRoot}>
      {isSelf
        ? <Button variant='outlined' color='primary' className={classes.actionSecondaryButton}>
            Setting
          </Button>    
        : <Button variant="contained" disabled={followed} color='primary' className={classes.actionPrimaryButton}> 
            {followed ? 'Following' : 'Follow'}
          </Button>}
      {isSelf
        ? <Button variant='outlined' color='primary' disabled={!hasGroupList} className={classes.actionSecondaryButton}>
            Saved Lists
          </Button>
        : null}
    </div>
  )
}

const RestActions = (props) => {
  const classes = useStyles()
  const followed = global.loginedUser.user.followingRest.includes(props.rest._id);
  const handleAddPost = () =>{
    history.push(`/createPost/${props.rest.entityID}`)
}
  return (
    <>
    <div className={classes.actionRoot}>
      <Button variant="contained" disabled={followed} color='primary' className={classes.actionPrimaryButton}>
        {followed ? 'Following' : 'Follow'}
      </Button>
    </div>
    <div className={classes.actionRoot}>
      <Button variant='outlined' color='primary' className={classes.actionSecondaryButton} onClick = {handleAddPost} >
        Add Post
      </Button>
      <Button variant='outlined' color='primary' className={classes.actionSecondaryButton}>
        Check-in
      </Button>
    </div>
    </>
  )
}

export default function UserProfile(props) {
  const [fetched, setFetched] = useState(false);
  const [entity, setEntity] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles()
  const urlParams = useParams();
  const entityID = urlParams.EntityID;
  
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    axios.get(`entity/${entityID}`)
    .then(res => {
      if (res.data) setEntity(res.data)
      setFetched(true)
    })
    .catch(err => console.log(err))
  }, [urlParams])

  if (!fetched || global.loginedUser.user == null) return <Loading/>
  else if (fetched && entity == null) return <Error404/>
  else return (
    <>
    <CssBaseline/>
    <NavBar/>
    <div className={classes.root}>
      <Avatar variant={entity.type == 'User' ? 'rounded' : 'circular'} className={classes.avatar}
      alt={entity.entityID} src={entity.profPhoto[0]}/>
      <Typography variant='h4'
        onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {entity.username}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{ paper: classes.popoverPaper, }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'right'}}
        transformOrigin={{ vertical: 'center', horizontal: 'left'}}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{`#${entity.tag}`}</Typography>
      </Popover>
      {entity.name
        ? <Typography variant='h6'>{entity.name}</Typography> : null}
      {entity.type == 'Rest' && entity.post.length !== 0
        ? <Rating rating={entity.rating/entity.post.length}/> : null}
      {entity.type == 'User'
        ? <UserInfo {...props} user={entity}/> : <RestInfo {...props} rest={entity}/>}
      {entity.type == 'User'
        ? <UserActions {...props} user={entity}/> : <RestActions {...props} rest={entity}/>}
    </div>
    <Posts filter={{_id: {$in: entity.post}}}/>
    </>
  )
}