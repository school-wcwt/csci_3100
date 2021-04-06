import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import {app} from '../../base';

//data: {name:"",Content:"",picture:"",hastag:["Hashtag1","Hashtag2","Hashtag3","Hashtag4","Hashtag5"]}


export default function AddPost() {
  const { register, handleSubmit} = useForm();
  const onSubmit  = (data) => {
    const downloadURL = [];
    console.log(data);
    for (let i = 0; i < data.photo.length; i++) {
      const storageRef = app.storage().ref();
      const newfile = data.photo[i];
      newfile["id"] = Math.random();
      const fileRef = storageRef.child(newfile.id+"/"+newfile.name);
      fileRef.put(data.photo[i]).then(()=>{
        console.log("Photo",i+1," Uploaded");
        downloadURL[i] = fileRef.getDownloadURL();
        console.log(downloadURL[i]);
      })
    }
    
  // post_create(authorID,targetFilter,data);
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
            <Form.File type="file" name="photo" ref={register} multiple/>
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