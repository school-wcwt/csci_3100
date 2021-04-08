import {Navbar,Form,Button,FormControl,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function PanelBar(){
    return(
<>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="text-center mx-auto">
    <Nav.Link as={Link} to="/main" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Back home</Nav.Link>
    <Nav.Link as={Link} to="/entity" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Entity Panel</Nav.Link>
    <Nav.Link as={Link} to="/post" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Post Panel</Nav.Link>
    <Nav.Link as={Link} to="/comment" className="mr-xl-5 mr-md-4 my-auto" style={{color: "LightCoral", fontWeight:800}}>Comment Panel</Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
</>
    );
}
export default PanelBar;