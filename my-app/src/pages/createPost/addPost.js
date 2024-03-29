import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm, Controller } from "react-hook-form"
import { TextField, InputLabel, InputAdornment, Button, Card, Slider, Tabs, Tab, CircularProgress } from '@material-ui/core'


import { history, uploadPhoto } from 'component'
import useStyles from './styles'
var postFn = require("../../component/load_backend/postFunction.js");
var entityFn = require('component/load_backend/entityFunction');
/**
 * Asking User for Post's data
 * @returns AddPost's Form
 */
export default function AddPost(props) {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [ loading, setLoading ] = useState(false);
  const [ type, setType ] = useState(0);
  const [ error, setError ] = useState(null);

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
    
    (async() => { try { 
      setLoading(true);
      const entity = await entityFn.entity_get(data.entityID)
      if (entity == null || entity.type !== 'Rest') throw new Error('Invalid restaurant ID.'); 
      const downloadURL = await uploadPhoto(data.photo)
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
      const res = await postFn.post_create({ entityID: data.entityID }, sendData)
      if (res.data !== null) {
        setLoading(false);
        history.push('/main')
      }
    } catch (err) { 
      console.log(err);
      if (err.message == 'Invalid restaurant ID.') setError(err.message)
      else if (err.name == 'FirebaseError') alert("Invalid file type (size: <5MB, type: image).");
      setLoading(false); 
    }})();
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
          <TextField fullWidth margin='dense' inputRef={register} className={classes.twoCol} error={error}
            required id="entityID" label="Restaurant ID" name="entityID" defaultValue={entityID} helperText={error}/>
          { type 
            ? <div className={classes.twoCol}>
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

        { type /* Tags */
          ? <div className={classes.sharedTags}>
              {[...Array(6)].map((x, i) => (
                <TextField margin='dense' inputRef={register} required={i==0} className={classes.threeCol}
                  id={`tag-${i}`} label={`Tag ${i+1}`} name={`tag-${i}`} key={`tag-${i}`}
                  InputProps={{startAdornment: <InputAdornment position="start">#</InputAdornment>}}/>
              ))}
            </div>
          : null}
        
        <Form.File id="upload" type="file" name="photo" accept="image/png, image/jpeg" ref={register} multiple/>

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
