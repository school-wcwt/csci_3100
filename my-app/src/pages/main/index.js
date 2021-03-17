import React from 'react';
import PrimarySearchAppBar from './component/appBar/appBar.js';
//import TopHead from './component/topHead/topHead.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button ,Form, FormControl, Container, Row, Col} from 'react-bootstrap';
import { makeStyles, StepLabel,CardMedia,Card,Grid  } from "@material-ui/core";
import styles from './mystyle.module.css'; 
//import  {ReactComponent as Logo } from '../../image/logo.png';
import logo from '../../image/icon2.PNG'; // Tell webpack this JS file uses this image
import SingleShowList from './component/gridList/gridList';
import NAVbar from "./component/nav.js";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
//---------------------------------------------


const useStyles = makeStyles((theme) => ({ 
  navbars:{
    backgroundColor: 'lightcoral',
    color:"white"
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  grid_style:{
    height: "100",
    width: "150",
    float: "left",
    
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
};

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



const Feed= (para)=>{
  const classes = useStyles();
  const rest=para.props.rest;
  const hashtag_list= para.props.hashtag;
  console.log('------------');
  console.log(para);
  var folder = "./img/feed_all/";
  var image_set = ["1.jpg","2.jpg","3.jpg"];
  var mytileData = [
    {
       img: folder + image_set[0],
       title: 'Image0',
       author: 'author',
    },
    {
      img: folder + image_set[1],
      title: 'Image1',
      author: 'author2',
    },
    {
      img: folder + image_set[2],
      title: 'Image2',
      author: 'author2',
    },

  ];
const hashtag_section= hashtag_list.map((hashtag)=>
<Col xs="2"> {hashtag.name}</Col>
);


//const listItems = numbers.map((number) =>
 // <li>{number}</li>
//);

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
                <nobr><div><div className={styles.user}>{rest.author}</div>
            <div className={styles.timetext}> posted on 16/3/2021</div>
            </div></nobr>
            at <div className={styles.user}> Restaurant</div>
            </Col>
      </Row>
      <Row>
        <SingleShowList tileData = {mytileData}/>
        <Col xs="2.9">
        </Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="180" alt="mATE." className=" float-left" id="icon"></img></Col>
        <Col xs="2.9"><img src= {logo} height="100" width="150" alt="mATE." className=" float-left" id="icon"></img></Col>
      </Row>

      <Row>       
      {hashtag_section}

      </Row>

      <Row>{rest.comment}</Row>
      <Row> ----------------</Row>
      <Row><Col xs="1">Icon</Col><Col xs="1">Username</Col> <Col>Me too!</Col></Row>
      <Row><Col xs="1">Icon</Col><Col xs="1">Username</Col> <Col>Me too!</Col></Row>
      <Row><Col xs="1">Icon</Col><Col xs="1">Username</Col> <Col>Me too!</Col></Row>
      <div className={styles.addBottomPad}></div>
      <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

</Col>
    <Col xs="1">Bell</Col>
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
  const greeting = 'Welcome to React';
  const namelist= ['a','b','c'];
  //list of objects
  const restaurant_list= [{"author": 'a1', "comment":'comment1' },{"author": 'a2', "comment":'comment2' }];
  const hashtag_list= [
    [{"name": 'h1.1', "frequency":11 },{"name": 'h1.2', "frequency":22}],

    [{"name": 'h2.1', "frequency":11 },{"name": 'h2.2', "frequency":22}]

];
var feed_components=[];
  var i=2;
  console.log("All:");
  console.log(hashtag_list);
  var list=[];
  for (i=0;i<restaurant_list.length;i++){
    console.log('hashtag_list'+i);
    console.log(hashtag_list[i]);
    var rest=restaurant_list[i];
    var hashtag= hashtag_list[i];
    var list= {rest,hashtag};
    console.log('list:');
    console.log(list);
    feed_components.push(<Feed props={list} />);



  //  list.push({rest,hashtag});
   // console.log('list:');
  //  console.log(list);

  }
  //const feed_components=   <Feed props={list} />

// var feed_components=[];
//feed_components.push( <div>hihi</div>);
 // feed_components.push(<div>byebye</div>);
    return (
        <div>
           <NAVbar/>
           <Topbar />
           {feed_components}
          
        </div>        
    )
}
export default Main;
//  <ShoppingList /> 
//<Part2 />
//<TopHead />
//<Topbar />
//



//