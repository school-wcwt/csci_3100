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

/*const useStyles = makeStyles((theme) => ({ 
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
}));*/

//------------------------------------

  //const styles =useStyles();

//k
//<img src={imgs[0]}/>
//<img src={imgs[1]}/>
//https://reactstrap.github.io/components/layout/



const Feed= (para)=>{
  //const classes = useStyles();
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