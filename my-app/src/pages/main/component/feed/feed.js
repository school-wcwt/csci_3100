import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import icon from '../user.png';
import Paper from '@material-ui/core/Paper';

const DataLoader = (postid) =>{
    // grab data from mongo , pong please help to handle this part
    const data = {
        PostOwner: "User Post Owner",
        PostDate: "16/3/2021",
        RestaurantName: "Restaurant",
        PostHeader: "I am Gbond_A. This restaurant is good.",
        hashtag_list: [{ "name": '#Yummy', "frequency": 11 }, { "name": '#Juicy', "frequency": 22 }],
        image_set: ["1.jpg", "2.jpg", "3.jpg"],
        image_descript:["Dish1","Dish2","Dish3"],
        comment:[{"name":"comment1","content":"I think so"},{"name":"comment2","content":"I think so too"},{"name":"comment3","content":"Me too"}]
    };
    return data ;
}

const Post = (postid) => {
    const data = DataLoader(postid);
    const img_link = 'https://drive.google.com/drive/folders/1-D2QkmDO38M0eB-qHGDdUryxBIj8Jhkw?usp=sharing';
    const folder = "./img/feed_all/";

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
                        <div><span style={{ color: "LightCoral", fontWeight: "800" }}>{data.PostOwner}</span> posted on {data.PostDate} at <span style={{ color: "LightCoral", fontWeight: "800" }}>{data.RestaurantName}</span>
                        </div>
                    </Row>

                    <Row className="my-3 ml-4">{data.PostHeader}</Row>

                    <Row className="mb-4">
                        <Carousel fade className="w-100">
                        { 
                        data.image_set.map( 
                        (image,idx) => 
                            <Carousel.Item style={{ height: "auto"}}>
                                <img className="d-block w-100" src={folder + image} alt = {data.image_descript[idx]} />
                                <Carousel.Caption> <p>{data.image_descript[idx]}</p> </Carousel.Caption>
                            </Carousel.Item>
                        )
                        }
                        </Carousel>
                    </Row>

                    <Row className="mb-4">
                        {
                        data.hashtag_list.map( 
                            (hashtag,idx) =>
                            <a href={"#" + idx} className="badge mr-2 text-light" style={{ backgroundColor: "LightCoral" }}>
                                <Col> {hashtag.name}</Col>
                            </a>
                        )
                        }
                    </Row>
                        {
                        data.comment.map( (comment_item) =>
                            <Row>
                            <Col xs="1" className="my-auto">
                                <img src={icon} height="30" width="30" alt="mATE." className="mx-auto my-2"></img>
                            </Col>
                            <Col xs="2" className="my-auto"><span style={{ color: "LightCoral", fontWeight: "800" }}>{comment_item.name}</span></Col>
                            <Col xs="8" className="my-auto"><p style={{overflowWrap: "break-word"}}>{comment_item.content}</p></Col>
                            </Row>
                        )  
                        }
                </Col>
            </Row>
        </Container>
    )

}

function Feed() {
    const postIDs = ["asddasd","asdasd","asdas"];
    return (
        postIDs.map((id) => <Post postid = {id}/>)
    )
}

export default Feed;