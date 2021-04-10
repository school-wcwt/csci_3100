import { useState } from 'react';
import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { app } from '../../base';
import { Upload_Photo } from '../../component/Upload/upload';
var postFn = require("../../component/load_backend/postFunction.js");


export default function AddPost() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    var targetFilter = { "entityID": "rrr-1296" };
    Upload_Photo(data.photo).then(downloadURL => {
      var edit_data = {
        "type": 0,
        "rating": data.rating,
        "content": data.content,
        "photo": downloadURL,
        "hashtag": data.hashtag_list
      };
      postFn.post_create(targetFilter, edit_data);
    })
  }
  return (
    <Container className="mt-5 pb-5 col-lg-6 bg-light rounded">
      <div className="py-3">
        <Form className="justify-content-center" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="RestaurantName">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="text" pattern="[0-9]" placeholder="0 ~ 9" required name="rating" ref={register} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} required name="content" placeholder="Please Type here..." ref={register} />
          </Form.Group>
          <Form.Group controlId="hashtag_list">
            <Form.Label>Hashtag</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control placeholder="#1" type="text" required name="hashtag_list[0]" ref={register} />
              </Col>
              <Col>
                <Form.Control placeholder="#2" type="text" required name="hashtag_list[1]" ref={register} />
              </Col>
              <Col>
                <Form.Control placeholder="#3" type="text" required name="hashtag_list[2]" ref={register} />
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
