import React from 'react';
//import PrimarySearchAppBar from './component/appBar/appBar.js';
//import TopHead from './component/topHead/topHead.js';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
//import { makeStyles, StepLabel,CardMedia,Card,Grid  } from "@material-ui/core";
//import styles from './mystyle.module.css'; 
//import  {ReactComponent as Logo } from '../../image/logo.png';
//import logo from '../img/icon2.png'; // Tell webpack this JS file uses this image
import icon from '../user.png';
import Paper from '@material-ui/core/Paper';

//import SingleShowList from '../../component/gridList/gridList';
//import MediaCard from '../../component/cardMedia/cardMedia';
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
}));*/


//------------------------------------

//const styles =useStyles();

//k
//<img src={imgs[0]}/>
//<img src={imgs[1]}/>
//https://reactstrap.github.io/components/layout/


const Feed_proc1 = (para) => {
    //const classes = useStyles();
    const rest = para.props.rest;
    const hashtag_list = para.props.hashtag;
    const img_link = 'https://drive.google.com/drive/folders/1-D2QkmDO38M0eB-qHGDdUryxBIj8Jhkw?usp=sharing';
    var folder = "./img/feed_all/";
    var image_set = ["1.jpg", "2.jpg", "3.jpg"];
    /* var mytileData = [
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
 
     ];*/
    const hashtag_section = hashtag_list.map((hashtag) =>
        <Col> {hashtag.name}</Col>
    );


    return (
        <Container className="pb-5 mt-5" style={{ borderBottomStyle: "solid", borderColor: "LightCoral" ,fontSize: "1.3vw"}}>
            <Row>
                <Col xs="1">
                    <Row><img src={icon}  alt="mATE." className="mx-auto my-2 img-fluid"></img></Row>
                    <Row><i className="fa fa-ellipsis-h mx-auto my-2" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                    <Row><i className="fa fa-heart-o mx-auto my-2" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                    <Row><i className="fa fa-comment-o mx-auto my-2" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                    <Row><i className="fa fa-bell-o mx-auto my-3" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                </Col>

                <Col xs="10" className="pl-5">
                    <Row className="mt-4">
                        <div><span style={{ color: "LightCoral", fontWeight: "800" }}>{rest.author}</span> posted on 16/3/2021 at <span style={{ color: "LightCoral", fontWeight: "800" }}>Restaurant</span>
                        </div>
                    </Row>

                    <Row className="my-3 ml-4">{rest.comment}</Row>

                    <Row className="mb-4">

                        <Carousel fade className="w-100">
                            <Carousel.Item style={{ height: "auto"}}>
                                <img
                                    className="d-block w-100"
                                    src={folder + image_set[0]}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <p>Dish1</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item style={{ height: "auto"}}>
                                <img
                                    className="d-block w-100"
                                    src={folder + image_set[1]}
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <p>Dish2</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item style={{ height: "auto"}}>
                                <img
                                    className="d-block w-100"
                                    src={folder + image_set[2]}
                                    alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <p>Dish3</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>


                    </Row>


                    <Row className="mb-4">
                        <a href="#" className="badge mr-2 text-light" style={{ backgroundColor: "LightCoral" }}>{hashtag_section[0]}</a>
                        <a href="#" className="badge mr-2 text-light" style={{ backgroundColor: "LightCoral" }}>{hashtag_section[1]}</a>
                    </Row>

                    <Row>
                        <Col xs="1" className="my-auto">
                            <img src={icon} height="30" width="30" alt="mATE." className="mx-auto my-2"></img>
                        </Col>
                        <Col xs="2" className="my-auto"><span style={{ color: "LightCoral", fontWeight: "800" }}>User1</span></Col>
                        <Col xs="8" className="my-auto"><p style={{overflowWrap: "break-word"}}>3.141592653589793238462643383279502884197169399375105820974944592307816406286 208998628034825342117067982148086513282306647093844609550582231725359408128481</p></Col>
                    </Row>

                    <Row>
                        <Col xs="1" className="my-auto">
                            <img src={icon} height="30" width="30" alt="mATE." className="mx-auto my-2"></img>
                        </Col>
                        <Col xs="2" className="my-auto"><span style={{ color: "LightCoral", fontWeight: "800" }}>User2</span></Col>
                        <Col xs="8" className="my-auto">Me too!</Col>
                    </Row>

                    <Row>
                        <Col xs="1" className="my-auto">
                            <img src={icon} height="30" width="30" alt="mATE." className="mx-auto my-2"></img>
                        </Col>
                        <Col xs="2" className="my-auto"><span style={{ color: "LightCoral", fontWeight: "800" }}>User3</span></Col>
                        <Col xs="8" className="my-auto">Me too!</Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    )

}

function Feed() {
    //const greeting = 'Welcome to React';
    //const namelist= ['a','b','c'];
    //list of objects
    const restaurant_list = [{ "author": 'User_A', "comment": 'I am Gbond_A. This restaurant is good.' }, { "author": 'User_B', "comment": 'I am Gbond_B. This restaurant is Bad.' }];
    const hashtag_list = [
        [{ "name": '#hashtag1_1', "frequency": 11 }, { "name": '#hashtag1_2', "frequency": 22 }],

        [{ "name": '#hashtag2_1', "frequency": 11 }, { "name": '#hashtag2_2', "frequency": 22 }]
    ];
    var feed_components = [];
    var i = 2;
    var list = [];
    for (i = 0; i < restaurant_list.length; i++) {
        var rest = restaurant_list[i];
        var hashtag = hashtag_list[i];
        var list = { rest, hashtag };
        feed_components.push(
                <Feed_proc1 props={list} />
        );
    }
    return feed_components;
}

export default Feed;