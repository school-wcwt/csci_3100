import { React, Component, useState } from 'react';
import { Navbar, Form, Button, FormControl, Nav, Container,Col } from 'react-bootstrap';
class AddPost extends Component {
  render() {
    return (
      <Container className="mt-5 pb-5 col-lg-6 bg-light rounded">
        <div className="py-3">
          <Form className="justify-content-center">
            <Form.Group controlId="Name">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={this.handleNameChange} />
            </Form.Group>
            <Form.Group controlId="Subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={this.handleNameChange} />
            </Form.Group>
            <Form.Group controlId="Hashtag">
              <Form.Label>Hashtag</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control placeholder="#1" type="text" onChange={this.handleHashtag1Change}/>
                </Col>
                <Col>
                  <Form.Control placeholder="#2" type="text" onChange={this.handleHashtag2Change}/>
                </Col>
                <Col>
                  <Form.Control placeholder="#3" type="text" onChange={this.handleHashtag3Change}/>
                </Col>                
                <Col>
                  <Form.Control placeholder="#4" type="text" onChange={this.handleHashtag4Change}/>
                </Col>               
                <Col>
                  <Form.Control placeholder="#5" type="text" onChange={this.handleHashtag5Change}/>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Pictures</Form.Label>
              <Form.File id="Upload" custom>
                <Form.File.Input />
                <Form.File.Label data-browse="Browse">
                  Choose file...
                 </Form.File.Label>
                <Form.Control.Feedback type="invalid">You did it!</Form.Control.Feedback>
              </Form.File>
            </Form.Group>
            <Button variant="dark" type="submit" className="float-right">
              Add Post
           </Button>
          </Form>
        </div>
      </Container>
    )
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }
  handleSubjectChange(e) {
    this.setState({ subject: e.target.value })
  }
  handleHashtag1Change(e) {
    this.setState({ Hashtag1: e.target.value })
  }
  handleHashtag2Change(e) {
    this.setState({ Hashtag2: e.target.value })
  }
  handleHashtag3Change(e) {
    this.setState({ Hashtag3: e.target.value })
  }
  handleHashtag4Change(e) {
    this.setState({ Hashtag4: e.target.value })
  }
  handleHashtag5Change(e) {
    this.setState({ Hashtag5: e.target.value })
  }
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleHashtag1Change = this.handleHashtag1Change.bind(this);
    this.handleHashtag2Change = this.handleHashtag2Change.bind(this);
    this.handleHashtag3Change = this.handleHashtag3Change.bind(this);
    this.handleHashtag4Change = this.handleHashtag4Change.bind(this);
    this.handleHashtag5Change = this.handleHashtag5Change.bind(this);   

    this.state = {
      name: '',
      subject: '',
      Hashtag1: '',
      Hashtag2: '',
      Hashtag3: '',
      Hashtag4: '',
      Hashtag5: ''
    };
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
}
export default AddPost;