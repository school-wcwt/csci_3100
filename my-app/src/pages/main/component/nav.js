import {Navbar,Form,Button,FormControl,Nav} from 'react-bootstrap';
import logo from '../../../image/icon2.PNG';
import {Link} from 'react-router-dom';
import {GetMyEntities} from '../../services/authService';

function NAVbar(){
    const entitiesID = GetMyEntities();
    return(
<>
  <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark">
    <Navbar.Brand href="#home"><img src={logo} height="50" width="150" alt="mATE." className=" float-left" id="icon"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="text-center mx-auto">
    <Nav.Link as={Link} to="/main" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Home</Nav.Link>
    <Nav.Link as={Link} to="/discover" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Discover</Nav.Link>
    <Nav.Link as={Link} to="/createPost" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Create Post</Nav.Link>
    <Nav.Link as={Link} to="/restregister" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Create Restaurant</Nav.Link>
    <Nav.Link as={Link} to="/search" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Search</Nav.Link>
    <Nav.Link as={Link} to={`/userprofile/${entitiesID}`} className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>My Account</Nav.Link>
    </Nav>
    <Form inline>
      <div className="mx-auto row">
      <FormControl type="text" placeholder="Search" className="col-8"/>
      <Button variant="outline-secondary"><i className="fa fa-search"></i></Button>
      </div>
    </Form>
    </Navbar.Collapse>
  </Navbar>
</>
    );
}
export default NAVbar;