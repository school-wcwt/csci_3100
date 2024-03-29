import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import history from '../../../../component/history';
import axios from '../../../../axiosConfig';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ()=> {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin:"1%",
    marginLeft: "5%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function RecipeReviewCard({datainput}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [seeting_expanded, setseeting_expanded] = React.useState(false);
  const [liked,setliked] = React.useState(false);
  const handleEditProfile = () => {
    setExpanded(!expanded);
  };
  const handleSeeting = () => {
    setseeting_expanded(!seeting_expanded);
  };
  const handleLikeMe = () =>{
    setliked(!liked);
    console.log(`Clicked liked to ${datainput.entitiesID}`);
    axios.patch(`entity/follow/${datainput.entitiesID}`,{"addFlag":liked}).then(res=>console.log("Liked")).catch(err=>console.log("Can not like"));
  };
  const handleLogOut = () =>{
    history.push('/login');
  }
  
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {datainput.UserName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick = {handleSeeting}>
            <MoreVertIcon />
          </IconButton>
        }
        title= {datainput.UserName}
        subheader={`Join Time: ${datainput.JoinTime}`}
      />
      <Collapse in={seeting_expanded} timeout="auto" unmountOnExit>
        <div style = {{float: "right"}}>
        <Button color = "secondary" onClick = {handleEditProfile}>Edit Profile</Button>
        <Button color= "secondary" onClick = {handleLogOut}>Log Out</Button>
        </div>
      </Collapse>
      <CardMedia
        className={classes.media}
        image={datainput.BigImagePath}
        title={datainput.BigImagePath}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {!datainput.introduction||datainput.introduction=="" ? "Welcome to my profile. I am new joiner from mATE": datainput.introduction}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick = {handleLikeMe}>
          <FavoriteIcon style = {{color: liked?"red":"grey"}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}