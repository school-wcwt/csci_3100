
import { Tooltip, Avatar, Button, Divider, withStyles, makeStyles, Typography, IconButton, Popover, CssBaseline, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
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
import { Form } from 'react-bootstrap';
import { Upload_Photo } from '../../component/Upload/upload';
import DateTimePicker from 'react-datetime-picker';
import {send_reservation_email_user} from '../../component/email/email';
const entityFn = require('../../component/load_backend/entityFunction');

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
  avatar_small: {
    width: '2rem',
    height: '2rem'
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
  popoverPaper: {
    padding: theme.spacing(1)
  },
  actionRoot: {
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
  },
  dialogButton: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    alignSelf: 'center',
  },
  dialogButtonSaveList: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    alignSelf: 'center',
    justifyContent: "flex-start",
  },
  dialogApply: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    alignSelf: 'center',
  },
  dialogApply: {
    width: '100%',
    position: 'relative',
    padding: theme.spacing(0, 3)
  },
  dialogItem: {
    padding: theme.spacing(0, 3, 2)
  },
  formShared: {
    display: 'flex'
  },
  formName: {
    flex: 3
  },
  formGender: {
    width: '7rem',
    margin: theme.spacing(1, 0, 0.5, 2),
    '& .MuiSelect-select': {
      paddingTop: '3px'
    }
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-12px'
  },
}))

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    color: 'black',
    fontSize: 11,
  },
}))(Tooltip);

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
      <Divider orientation='vertical' variant='middle' flexItem />
      {renderItem('Followed', props.user.followed.length)}
      <Divider orientation='vertical' variant='middle' flexItem />
      {renderItem('Following User', props.user.followingUser.length)}
      <Divider orientation='vertical' variant='middle' flexItem />
      {renderItem('Following Restaurants', props.user.followingRest.length)}
    </div>
  )
}
const RestInfo = (props) => {
  const classes = useStyles();
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(props.rest.address);
    alert("Location Copied");
  }
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(props.rest.phone);
    alert("Phone Copied");
  }
  const handleCopyHr = () => {
    navigator.clipboard.writeText(`From ${String(props.rest.openingHr).split(",")[0]} To ${String(props.rest.openingHr).split(",")[1]}`);
    alert("OpeningHour Copied");
  }
  return (
    <div className={classes.infoRoot}>
      <Tooltip title={<Typography>{`Location: ${props.rest.address}`}</Typography>}>
        <IconButton onClick={handleCopyAddress}>
          <LocationOnRounded />
        </IconButton>
      </Tooltip>
      {props.rest.phone && props.rest.phone != 0
        ?
        <Tooltip title={<Typography>{`Phone: ${props.rest.phone}`}</Typography>}>
          <IconButton onClick={handleCopyPhone}>
            <PhoneRounded />
          </IconButton>
        </Tooltip>
        : <IconButton disabled>
          <PhoneDisabledRounded />
        </IconButton>}
      {props.rest.openingHr && props.rest.openingHr.length !== 0
        ?
        <Tooltip title={<Typography>{`Opening Hour: From ${String(props.rest.openingHr).split(",")[0]} To ${String(props.rest.openingHr).split(",")[1]}`}</Typography>}>
          <IconButton onClick={handleCopyHr}>
            <AlarmRounded />
          </IconButton>
        </Tooltip>
        : <IconButton disabled>
          <AlarmOffRounded />
        </IconButton>}
    </div>
  )
}

const SettingDialog = (props) => {
  const classes = useStyles()
  const { register, handleSubmit, control } = useForm();
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    confirmpw: false,
  });

  const handleLogout = () => {
    axios.post('/logout')
      .then(history.push('/login'));
  }

  const onSubmit = data => {
    setLoading(true);
    if (data.name == '' && data.gender == '' && data.email == '' && data.phone == '' && data.photo.length == 0) {
      setLoading(false);
      props.handleClose();
      return true;
    }

    // statr update below
    let new_data = {}
    const update_entities = () => {
      entityFn.entity_edit(new_data)
        .then(res => {
          console.log("Update sucess!");

          global.loginedUser.setUser(res.data);
          setLoading(false);
          props.handleClose();
          return true;
        })
    };

    if (data.name != '') new_data.name = data.name;
    if (data.gender != '') new_data.gender = data.gender
    if (data.email != '') new_data.email = data.email
    if (data.phone != '') new_data.phone = data.phone
    if (data.photo.length != 0) {
      Upload_Photo(data.photo).then(downloadURL => {
        new_data.profPhoto = downloadURL
        update_entities();
      })
    }
    else {
      update_entities();
    }
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Change My Info</DialogTitle>
        <DialogContent>
          <DialogContentText> So, who do you want to be? Just Fill What You Wanna change! </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.formShared}>
              <TextField margin='dense' inputRef={register} className={classes.formName}
                id="name" label="Name" name="name" type="name" />
              <FormControl className={classes.formGender} >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Controller as={
                  <Select labelId="gender-label">
                    <MenuItem value=''>-</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Non-Binary'>Non-Binary</MenuItem>
                  </Select>
                } control={control} name='gender' defaultValue='' />
              </FormControl>
            </div>
            <TextField fullWidth margin='dense' inputRef={register}
              id="email" label="Email" name="email" type="email" />
            <TextField fullWidth margin='dense' inputRef={register}
              id="phone" label="Phone" name="phone" />
            <DialogContentText>Upload Icon Image</DialogContentText>
            <Form.File type="file" name="photo" ref={register} />
          </form>
        </DialogContent>
        <div className={classes.dialogApply}>
          <Button fullWidth color="primary" variant='contained' disabled={loading} className={classes.dialogButton}
            onClick={handleSubmit(onSubmit)} >
            Apply Changes
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        <div className={classes.dialogItem}>
          <Button fullWidth size='small' color="primary" className={classes.dialogButton} onClick={props.handleClose} >
            Cancel
          </Button>
        </div>
        <DialogTitle>I can't eat anymore...</DialogTitle>
        <div className={classes.dialogItem}>
          <Button fullWidth variant='outlined' color='primary' className={classes.dialogButton} onClick={handleLogout}>Log out</Button>
        </div>
        <DialogTitle>Just let me go.</DialogTitle>
        <div className={classes.dialogItem}>
          <Button fullWidth variant='outlined' color='primary' className={classes.dialogButton}>Delete Account</Button>
        </div>
      </Dialog>
    </div>
  );
}

const DisplaySingleUser = (props) =>{
  const classes = useStyles()
  const Clickuser = () =>{
    props.handleClose();
    history.push(`/profile/${props.userObj.entityID}`);
  }
  return (
    <Button fullWidth size='small' color="primary" className={classes.dialogButtonSaveList} onClick = {Clickuser}>
      <Avatar variant={props.userObj.type == 'User' ? 'rounded' : 'circular'} className={classes.avatar_small}
          alt={props.userObj.entityID} src={props.userObj.profPhoto[0]}/>
          <div style = {{marginLeft: "5%"}}>
          {`${props.userObj.username}`}
          </div>
          
    </Button>
  )
}

const UserActions = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [openList,setOpenList] = useState(false);
  const [entity2, setEntity2] = useState(null);
  const followed = global.loginedUser.user.followingUser.includes(props.user._id);
  const isSelf = global.loginedUser.user.entityID == props.user.entityID;
  const hasGroupList = props.user.followingUser.length != 0
  const SavedListDialog = (props) => {
    const classes = useStyles()
    return (
      <div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle>Followed List</DialogTitle>
          <DialogContent>
            <DialogContentText> {`${global.loginedUser.user.username} has followed Them. Click to explore more`} </DialogContentText>
            {entity2? entity2.map((entityObj)=><DisplaySingleUser {...props} userObj = {entityObj}/>): <p>No data</p>}
          </DialogContent>
          <div className={classes.dialogItem}>
            <Button fullWidth size='small' color="primary" className={classes.dialogButton} onClick={props.handleClose} >
              Cancel
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
  const HandleFollow = () =>{
    entityFn.entity_follow(props.user.entityID)
    .then(res=>global.loginedUser.setUser(res))
    .catch(res=>console.log("Can not follow "+ props.user.entityID))
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenList = () => setOpenList(true);
  const handleCloseList = () => setOpenList(false);
  const handleSavedList = () =>{
    console.log("Loading saved list");
    var fil1 = {
      '_id': {
        $nin:
        global.loginedUser.user.followed.concat(global.loginedUser.user._id)
      },
      'type': 'User'
    }
    entityFn.entity_post(fil1).then(followedArray => {
      setEntity2(followedArray);
      handleOpenList();
    })

}
  return (
    <div className={classes.actionRoot}>
      {isSelf
        ? <Button variant='outlined' color='primary' className={classes.actionSecondaryButton} onClick={handleOpen}>
          Setting
          </Button>
        : <Button variant="contained" disabled={followed} color='primary' className={classes.actionPrimaryButton} onClick={HandleFollow}>
          {followed ? 'Following' : 'Follow'}
        </Button>}
      {isSelf
        ? <Button variant='outlined' color='primary' disabled={!hasGroupList} className={classes.actionSecondaryButton} onClick = {handleSavedList}>
          Followed Lists
          </Button>
        : null}
      <SettingDialog open={open} handleOpen={handleOpen} handleClose={handleClose} />
      <SavedListDialog {...props} open={openList} handleOpen={handleOpenList} handleClose={handleCloseList} />
    </div>
  )
}


const ReservationDialog = (props) => {
  const classes = useStyles()
  const { register, handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [ResDate, setResDate] = useState(new Date());
  const [error,setError] = useState({Name:false,Phone:false,});
  const onSubmit = data => {
    setLoading(true);
    if (data.Name == ''){error.Name = true; setError(error); return true}
    if (data.Phone == ''){error.Phone = true; setError(error); return true}
    const passdata = {
      user_email:global.loginedUser.user.email,
      rest_email:"mate@gmail.com",
      to_name:data.Name,
      RestaurantName:props.rest.username,
      Time:`${ResDate.toDateString()} ${ResDate.toLocaleTimeString()}`,
      Remarks: `User Phone Number: ${data.Phone} ${data.Remarks||''}` 
    }
    send_reservation_email_user(passdata)
    .then(res=>{
      alert("Please Check Your Email !")
      setLoading(false);
      setError({Name:false,Phone:false,})
      props.handleClose();
      
    })
    .catch(err=>{
      alert("Fail to send email !")
      setLoading(false);
      setError({Name:false,Phone:false,})
      props.handleClose();
    })
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Make Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText> So, who do you want to be? Just Fill What You Wanna change! </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DateTimePicker onChange={setResDate} value={ResDate} disableClock={true}/>
            <TextField inputRef={register} className={classes.formName}
              id="Name" fullWidth label="Name" name="Name" type="Name" error={error.Name} helperText = {error.Name?"Please Enter Your Name":null} />
            <TextField fullWidth inputRef={register} className={classes.formName}
              id="Remarks" label="Remarks" name="Remarks" type="Remarks" />
            <TextField inputRef={register} className={classes.formName} error={error.Phone} helperText = {error.Phone?"Please Enter Your Phone Number":null}
              id="Phone" label="Phone Number" name="Phone" type="Phone" />
          </form>
        </DialogContent>
        <Button fullWidth color="primary" variant='contained' disabled={loading} className={classes.dialogButton}
          onClick={handleSubmit(onSubmit)} >
          Confirm
          </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        <div className={classes.dialogItem}>
          <Button fullWidth size='small' color="primary" className={classes.dialogButton} onClick={props.handleClose} >
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
const RestActions = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const followed = global.loginedUser.user.followingRest.includes(props.rest._id);
  const handleAddPost = () => {
    history.push(`/createPost?entityID=${props.rest.entityID}`)
  }
  const HandleFollow = () =>{
    entityFn.entity_follow(props.rest.entityID)
    .then(res=>global.loginedUser.setUser(res))
    .catch(res=>console.log("Can not follow "+ props.rest.entityID))
  }
  return (
    <>
      <div className={classes.actionRoot}>
        <Button variant="contained" disabled={followed} color='primary' className={classes.actionPrimaryButton} onClick = {HandleFollow}>
          {followed ? 'Following' : 'Follow'}
        </Button>
      </div>
      <div className={classes.actionRoot}>
        <Button variant='outlined' color='primary' className={classes.actionSecondaryButton} onClick={handleAddPost} >
          Add Post
      </Button>
        <Button variant='outlined' color='primary' className={classes.actionSecondaryButton} onClick={handleOpen}>
          Book Me!
      </Button>
        <ReservationDialog {...props} open={open} handleOpen={handleOpen} handleClose={handleClose} />
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

  if (!fetched || global.loginedUser.user == null) return <Loading />
  else if (fetched && entity == null) return <Error404 />
  else return (
    <>
      <CssBaseline />
      <NavBar />
      <div className={classes.root}>
        <Avatar variant={entity.type == 'User' ? 'rounded' : 'circular'} className={classes.avatar}
          alt={entity.entityID} src={entity.profPhoto[0]} />
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
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>{`#${entity.tag}`}</Typography>
        </Popover>
        {entity.name
          ? <Typography variant='h6'>{entity.name}</Typography> : null}
        {entity.type == 'Rest' && entity.post.length !== 0
          ? <Rating rating={entity.rating / entity.post.length} /> : null}
        {entity.type == 'User'
          ? <UserInfo {...props} user={entity} /> : <RestInfo {...props} rest={entity} />}
        {entity.type == 'User'
          ? <UserActions {...props} user={entity} /> : <RestActions {...props} rest={entity} />}
      </div>
      <Posts filter={{ _id: { $in: entity.post } }} />
    </>
  )
}