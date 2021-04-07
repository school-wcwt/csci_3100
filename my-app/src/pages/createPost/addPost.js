import {useState} from 'react';
import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { app } from '../../base';
import {Upload_Photo} from '../../component/Upload/upload';
var postFn = require("../../component/load_backend/postFunction.js");

export default function AddPost() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }
    
    try {
      const downloadURL = Upload_Photo(data.photo);
      while (data.photo.length != 0 && downloadURL[data.photo.length-1]==undefined ){
        await wait(500);
      }
        
      console.log("download url are : " + downloadURL.length);
      var targetFilter = {"entityID": "rrr-1296"}
      console.log('create');
      var edit_data = {
        "type":  0,
        "username": data.RestaurantName,
        "content": data.content,
        "photo": downloadURL,
        "hashtag": data.hashtag_list
      };
      console.log(edit_data);
      console.log(data.RestaurantName);
      console.log(edit_data.content);
      console.log(edit_data.photo);
      console.log(edit_data.hashtag);

      await postFn.post_create(targetFilter,edit_data);
    }
    catch(err){
      console.log(err)
      console.log('ERROR!!!!!!!!!')
  }
  }
  return (
    <Container className="mt-5 pb-5 col-lg-6 bg-light rounded">
      <div className="py-3">
        <Form className="justify-content-center" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="RestaurantName">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control type="text" placeholder="Name" name="RestaurantName" ref={register} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} name="content" placeholder="Please Type here..." ref={register} />
          </Form.Group>
          <Form.Group controlId="hashtag_list">
            <Form.Label>Hashtag</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control placeholder="#1" type="text" name="hashtag_list[0]" ref={register} />
              </Col>
              <Col>
                <Form.Control placeholder="#2" type="text" name="hashtag_list[1]" ref={register} />
              </Col>
              <Col>
                <Form.Control placeholder="#3" type="text" name="hashtag_list[2]" ref={register} />
              </Col>
              <Col>
                <Form.Control placeholder="#4" type="text" name="hashtag_list[3]" ref={register} />
              </Col>
              <Col>
                <Form.Control placeholder="#5" type="text" name="hashtag_list[4]" ref={register} />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Pictures</Form.Label>
            <Form.File type="file" name="photo" ref={register} multiple />
          </Form.Group>
          <Button variant="dark" type="submit" className="float-right">
            Add Post
           </Button>
        </Form>
      </div>
    </Container>
  )
}

/*addPost(){
        axios.post('/addPost', {
          title: this.state.title,
          subject: this.state.subject
        })
          .then(function (response) {
            console.log('response from add post is ', response);
            hashHistory.push('/')
          })
          .catch(function (error) {
            console.log(error);
          });
}*/