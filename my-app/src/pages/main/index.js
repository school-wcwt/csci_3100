import React from 'react';
import PrimarySearchAppBar from './component/appBar/appBar.js';
//import TopHead from './component/topHead/topHead.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button ,Form, FormControl, Container, Row, Col} from 'react-bootstrap';
import { makeStyles, StepLabel } from "@material-ui/core";
import styles from './mystyle.module.css'; 

//import  {ReactComponent as Logo } from '../../image/logo.png';
import logo from '../../image/icon2.PNG'; // Tell webpack this JS file uses this image
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
//---------------------------------------------


const useStyles = makeStyles((theme) => ({ 
  navbars:{
    backgroundColor: 'lightcoral',
    color:"white"
  }
}));



//------------------------------------
class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }
const Part2 = () => {
    return (
        <div>
                2
        </div>
    );
}

const Topbar = () => {
  return(
  <>
  <Nav variant="pills" id="my-nav" defaultActiveKey="link-1">

    <Nav.Item>
           <img src= {logo} height="60" width="150" alt="mATE." className=" float-left" id="icon"></img>
    </Nav.Item>
    <Nav.Item>
    <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link  className= 'toggle-switch' className={styles.my_navlink} eventKey="link-1" data-toggle="pill">Active</Nav.Link>
    </Nav.Item>
<Nav.Item>
<Nav.Link eventKey="link-2" data-toggle="pill">Option 234</Nav.Link>
</Nav.Item>
<Nav.Item>
<Nav.Link eventKey="link-3" data-toggle="pill">
Disabled
</Nav.Link>
</Nav.Item>
    </Nav>
  </>
  )
}

  //const styles =useStyles();

const Newbar= ()=>{
return(
  <Navbar  variant="pills" bg="light" expand="lg">
  <Navbar.Brand href="#home"></Navbar.Brand>
  <img src= {logo} height="60" width="150" alt="mATE." className=" float-left" id="icon"></img>

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Item>      <Nav.Link href="#home">Home</Nav.Link></Nav.Item>

      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

)
}
//k
//<img src={imgs[0]}/>
//<img src={imgs[1]}/>
//https://reactstrap.github.io/components/layout/



const Feed= (props)=>{
return(
<Container>
<Row>
    <Col xs="1">
      <Row>Icon</Row>
      <Row>      <Col xs="1">
        <Row>dots</Row>
        <Row>Heart</Row>
        <Row>Talk</Row>
      </Col>     </Row>
    </Col>
    <Col>     
        <Row>
              <Col>
                <nobr><div><div className={styles.user}>User</div>
            <div className={styles.timetext}> posted on 16/3/2021</div>
            </div></nobr>
            at <div className={styles.user}> Restaurant</div>
            </Col>
            <Col align='right'>bell</Col>
      </Row>

      <Row>
        <Col xs="2.9"><img src={'../../image/icon2.PNG'} />
          <img src="./resources/img/1.jpg"/>
        </Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="180" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
      </Row>

      <Row>       
         <Col xs="2">Hash Tag 1</Col>
        <Col xs="2">HashTag 2 </Col>
        <Col xs="2">HashTag 3 </Col>
        <Col xs="2">HashTag 4 </Col>
        <Col xs="2">HashTag 5 </Col>
        <Col xs="2">HashTag 6 </Col>
        <Col xs="2">HashTag 7 </Col>
        <Col xs="2">HashTag 8 </Col>
      </Row>

      <Row>I go to school by bus</Row>
      <Row> ----------------</Row>
      <Row><Col xs="1">Icon</Col><Col xs="1">Username</Col> <Col>Me too!</Col></Row>
      <Row><Col xs="1">Icon</Col><Col xs="1">Username</Col> <Col>Me too!</Col></Row>
      <Row><Col xs="1">Icon</Col><Col xs="1">Username</Col> <Col>Me too!</Col></Row>
      
</Col>
</Row>
</Container>
)

}









const Feed2 = (props) => {
  let imgs = [
    'https://res.cloudinary.com/stealthman22/image/upload/v1586308024/new-portfolio/hero/time-lapse-photography-of-waterfalls-during-sunset-210186.jpg',
    'https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg',
  ];
  const img_lists = require('../../image/icon2.PNG').default; // with require
    return (
      <>
    <div className={styles.row}>
    <div className={styles.column, styles.left}>
    </div>
    <div className={styles.column, styles.right}>
 
    <Container>      
      <Row>
        <Col xs="1">Icon</Col>
        <Col>
        <nobr><div><div className={styles.user}>User</div>
        <div className={styles.timetext}> posted on 16/3/2021</div>
        </div></nobr>
        at <div className={styles.user}> Restaurant</div>
        </Col>

        <Col align='right'>bell</Col>
      </Row>
      <Row>

      </Row>
      <Row>
      <Col xs="1">
        <Row><Col xs="1">dots</Col></Row>
        <Row><Col xs="1">hi</Col></Row>
      </Col>     
        <Col xs="2.9"><img src={'../../image/icon2.PNG'} />
        <img src="./resources/img/1.jpg"/>

        <div>
</div>
        
        </Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>

        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="180" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
      </Row>
      <Row>
      <Col xs="1">
        <Row><Col xs="1">dots</Col></Row>
        <Row><Col xs="1">1</Col></Row>
        <Row><Col xs="1">1</Col></Row>
        <Row><Col xs="1">1</Col></Row>
        <Row className={styles.my_bottom}><Col xs="1">hi</Col></Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Col>     
        <Col xs="2">Hash Tag 1</Col>
        <Col xs="2">HashTag 2 </Col>
        <Col xs="2">HashTag 3 </Col>
        <Col xs="2">HashTag 4 </Col>
        <Col xs="2">HashTag 5 </Col>
        <Col xs="2">HashTag 6 </Col>
        <Col xs="2">HashTag 7 </Col>
        <Col xs="2">HashTag 8 </Col>
      </Row>
      <Row>
        
        <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
        <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
        <Col sm="4">.col-sm-4</Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>.col-sm-12 .col-md-6 .offset-md-3</Col>
      </Row>
      <Row>
        <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
        <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
      </Row>
    </Container>
    </div>
    </div>
    </>
  );
}


const Main = ()=>{
    return (
        <div>
           
           <Topbar />
           <Feed />
        </div>        
    )
}

export default Main;
//  <ShoppingList /> 
//<Part2 />
//<TopHead />
//<Topbar />
//