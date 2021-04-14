import { useState, React } from 'react';
import ReactDOM from "react-dom";
import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
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
  console.log("Inside function Add post func for " + props.entityID);


  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);
  const { register, handleSubmit } = useForm();

  const addtag = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removetag = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const cleartag = () => {
    setCounter(prevCounter => prevCounter - prevCounter);
    setIndexes([]);
  };

  const onSubmit = data => {
    var targetFilter = { "entityID": props.entityID || "rrr-1296" };
    var rating = parseInt(data.rating);
    rating = rating < 0 ? 0 : rating;
    rating = rating > 10 ? 10 : rating;
    Upload_Photo(data.photo).then(downloadURL => {
      var edit_data = {
        "type": 1,
        "rating": rating,
        "content": data.content,
        "photo": downloadURL,
        "hashtag": data.hashtag_list
      };
      postFn.post_create(targetFilter, edit_data).then(res => history.push('/main'));
      console.log(edit_data);

    })
  }
  
  

  return (
    <Container className="mt-5 pb-5 col-lg-6 bg-light rounded">
      <div className="py-3">
        <Form className="justify-content-center" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="RestaurantName">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" min="0" max="10" placeholder="0 ~ 10" required name="rating" ref={register} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} required name="content" placeholder="Please Type here..." ref={register} />
          </Form.Group>
          <Form.Group controlId="hashtag_list">

            {indexes.map(index => {
              const fieldName = `hashtag_list[${index}]`;
              return (
                <fieldset name={fieldName} key={fieldName}>


                  <input
                    type="text"
                    name={fieldName}
                    placeholder={`#Hashtag${index + 1}`}
                    ref={register}
                    required
                  />

                </fieldset>
              );
            })}

                  <button type="button" onClick={addtag}>
                    Add tag
                  </button>


          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Pictures</Form.Label>
            <Form.File type="file" name="photo" ref={register} multiple />
          </Form.Group>
        </Form>
      </div>
    </Container>
  )
}
