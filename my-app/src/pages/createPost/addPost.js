import { useState } from 'react';
import { Navbar, Form, Nav, Container, Col } from 'react-bootstrap';
import { TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Button, Card, Slider, Tabs, Tab, Paper } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { app } from '../../base';
import { Upload_Photo } from '../../component/Upload/upload';
import history from '../history';
import Loading from '../../component/loading'
import { useParams } from 'react-router';
var postFn = require("../../component/load_backend/postFunction.js");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: `2rem auto`,
    padding: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(2, 0)
  },
  shared: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  slider: {
    width: '100%',
  },
  sharedItem: {
    flex: 1
  },
  formType: {
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
  buttonWrapper: {
      width: '100%',
      position: 'relative',
  },
  button: {
    margin: `0.5rem auto`,
    background: theme.palette.primary.main,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '2px',
    color: theme.palette.grey[200],
    '&:hover': {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    }
  },
}))

export default function AddPost(props) {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [ loading, setLoading ] = useState(false);
  const [ type, setType ] = useState(0);
  const params = new URLSearchParams(window.location.search).get('entityID')
  const entityID = params !== null ? params : '';

  const onSubmit = data => {
    const processData = data => {
      var sendTag = [];
      if (data['tag-0'] !== '') sendTag.push(data['tag-0']);
      if (data['tag-1'] !== '') sendTag.push(data['tag-1']);
      if (data['tag-2'] !== '') sendTag.push(data['tag-2']);
      if (data['tag-3'] !== '') sendTag.push(data['tag-3']);
      if (data['tag-4'] !== '') sendTag.push(data['tag-4']);
      if (data['tag-5'] !== '') sendTag.push(data['tag-5']);
      return sendTag
    }
    
    setLoading(true);
    Upload_Photo(data.photo).then(downloadURL => {
      const sendData = {
        type: type,
        photo: downloadURL,
        content: data.content,
        rating: data.rating
      };
      if (data['tag-0'] !== undefined) {
        const sendTag = processData(data);
        sendData.hashtag = sendTag;
      };
      postFn.post_create({ entityID: data.entityID }, sendData)
      .then(res => {
        setLoading(false);
        history.push('/main');
      })
    })
  }
  
  

  return (
    <Card className={classes.root}>
      <Tabs textColor="primary" indicatorColor="primary" variant='fullWidth'
        value={type} onChange={(e,val) => setType(val)}>
        <Tab label="Check-in" value={0}/>
        <Tab label="Review" value={1}/>
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.shared}>
          <TextField fullWidth margin='dense' inputRef={register} className={classes.sharedItem}
            required id="entityID" label="Restaurant ID" name="entityID" defaultValue={entityID}/>
          {type 
          ? <div className={classes.sharedItem}>
            <InputLabel shrink>Rating</InputLabel>
            <Controller render={props => (
              <Slider {...props} step={1} marks max={10} className={classes.slider}
                onChange={(_, value) => {props.onChange(value);}}
                valueLabelDisplay="auto" />
            )} control={control} name='rating' defaultValue={5} />
          </div>
          : null}
        </div>
        <TextField fullWidth margin='dense' inputRef={register} multiline rowsMax={4}
          required id="content" label="Content" name="content" />
        {type 
        ? <div className={classes.shared}>
            {[...Array(3)].map((x, i) => (
              <TextField margin='dense' inputRef={register} required={i==0} className={classes.sharedItem}
                id={`tag-${i}`} label={`Tag ${i+1}`} name={`tag-${i}`} key={`tag-${i}`}
                InputProps={{startAdornment: <InputAdornment position="start">#</InputAdornment>}}/>
            ))}
          </div>
        : null}
        {type 
        ? <div className={classes.shared}>
        {[...Array(3)].map((x, i) => (
          <TextField margin='dense' inputRef={register} className={classes.sharedItem}
            id={`tag-${i+3}`} label={`Tag ${i+4}`} name={`tag-${i+3}`} key={`tag-${i+3}`}
            InputProps={{startAdornment: <InputAdornment position="start">#</InputAdornment>}}/>
        ))}
        </div>
        : null}
        <Form.File type="file" name="photo" ref={register} multiple/>
        <div className={classes.buttonWrapper}>
          <Button fullWidth variant="contained" disabled={loading} type="submit" 
              color='primary' className={classes.button}>
            Add Post
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </Card>
  )
}
