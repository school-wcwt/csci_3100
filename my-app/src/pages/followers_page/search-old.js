import React, { useState, useEffect,Link } from "react";
import { Navbar, Form, Button, FormControl, Nav, Container, Col, Modal,Row } from 'react-bootstrap';

const entityFn = require("../../component/load_backend/entityFunction");
const Search = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNameChange = (event) => {
    console.log('hihi')
    console.log(event.target.value);
    console.log(event.target.id)
    var new_value = event.target.value;
    set_input(new_value);
    var filter = {
      $or: [
        { "entityID": { $regex: '^' + new_value } },
        { "username": { $regex: '^' + new_value } }
      ]
    };
    console.log('filter:')
    console.log(filter)
    change_post(filter)
  }

  const change_post = async (filter) => {
    try {
      var entity2 = await entityFn.entity_post(filter);
      set_entity(entity2)
    }
    catch (err) {
      console.log(err)
      console.log('---------------')
    }
  }

  const [input, set_input] = useState('');
  const [entity, set_entity] = useState(null);

  useEffect(() => {change_post()},[])

  return (
    <div>
      <Form inline>
        <div className="mx-auto row">
          <FormControl type="text" placeholder="Search" className="col-8" onChange={(event) => { handleNameChange(event)}} />
          <Button variant="outline-secondary"><i className="fa fa-search" onClick={handleShow}></i></Button>
        </div>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title style={{color: "LightCoral", fontWeight:800}}>Search Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div>
            {entity != null ? entity.map(sinEnt => {
              return (
                
                <div className="border-bottom py-2 mx-0">                
                  <Row>
                    <Col>Username: {sinEnt.username}</Col> 

                    <Col className="text-center"> <a href={`/profile/${sinEnt.entityID}`}>Profile</a></Col>
                  </Row>
                </div>
              )
            }) : ''}
          </div></Modal.Body>
      </Modal>

    </div>
  )
} ;
export default Search;