import {Navbar,Form,Button,FormControl,Nav} from 'react-bootstrap';
import logo from '../../../image/icon2.PNG';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>



function NAVbar(){
    return(
<>
  <Navbar collapseOnSelect expand="md" bg="light" fixed="top">
    <Navbar.Brand href="#home"><img src={logo} height="50" width="150" alt="mATE." className=" float-left" id="icon"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="text-center mx-auto">
    <Nav.Link href="#home" className="mr-xl-5 mr-md-4" style={{color: "LightCoral", fontWeight:800}}>Home</Nav.Link>
    <Nav.Link href="#discover" className="mr-xl-5 mr-md-4" style={{color: "LightCoral", fontWeight:800}}>Dicover</Nav.Link>
    <Nav.Link href="#create" className="mr-xl-5 mr-md-4" style={{color: "LightCoral", fontWeight:800}}>Create</Nav.Link>
    <Nav.Link href="#setting" className="mr-xl-5 mr-md-4" style={{color: "LightCoral", fontWeight:800}}>Setting</Nav.Link>
    </Nav>
    <Form inline>
      <div className="mx-auto row">
      <FormControl type="text" placeholder="Search" className="col-8"/>
      <Button variant="outline-secondary"><PageviewRoundedIcon color = "secondary"/></Button>
      </div>
    </Form>
    </Navbar.Collapse>
  </Navbar>
</>
    );
}
export default NAVbar;