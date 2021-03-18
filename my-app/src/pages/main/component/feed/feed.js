import React from 'react';
//import PrimarySearchAppBar from './component/appBar/appBar.js';
//import TopHead from './component/topHead/topHead.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button ,Form, FormControl, Container, Row, Col} from 'react-bootstrap';
import { makeStyles, StepLabel,CardMedia,Card,Grid  } from "@material-ui/core";
//import styles from './mystyle.module.css'; 
//import  {ReactComponent as Logo } from '../../image/logo.png';
import logo from '../../../../image/icon2.PNG'; // Tell webpack this JS file uses this image
import SingleShowList from '../../component/gridList/gridList';
import MediaCard from '../../component/cardMedia/cardMedia';
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
    
  },
  user_style:{
    color:"lightcoral",
    fontSize: "large",
    display:"inline",
  },
  timetext:{
    display:"inline",
    color:"grey",
    },
  addBottomPad:{
    paddingBottom: "10em"
  }
}));


//------------------------------------

  //const styles =useStyles();

//k
//<img src={imgs[0]}/>
//<img src={imgs[1]}/>
//https://reactstrap.github.io/components/layout/


const Feed_proc1= (para)=>{
  const classes = useStyles();
  const rest=para.props.rest;
  const hashtag_list= para.props.hashtag;
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
                <nobr><div><div className={classes.user_style}>{rest.author}</div>
            <div className={classes.timetext}> posted on 16/3/2021</div>
            </div></nobr>
            at <div className={classes.user_style}> Restaurant</div>
            </Col>
      </Row>
      <Row>
        <SingleShowList tileData = {mytileData}/>
        <MediaCard image_path = {folder + image_set[0]}/>
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
      <div className={classes.addBottomPad}></div>
      <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

</Col>
    <Col xs="1">Bell</Col>
</Row>
</Container>
)

}

function Feed(){
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
  var list=[];
  for (i=0;i<restaurant_list.length;i++){
    var rest=restaurant_list[i];
    var hashtag= hashtag_list[i];
    var list= {rest,hashtag};
    feed_components.push(<Feed_proc1 props={list} />);
  }
  return feed_components;
}

export default Feed;