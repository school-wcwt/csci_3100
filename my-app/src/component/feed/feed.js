import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

const DataLoader = (postid) =>{
    // grab data from mongo , pong please help to handle this part
    const data = {
        PostOwner: "User Post Owner",
        UserIcon: "/img/feed_all/user.png",
        PostDate: "16/3/2021",
        RestaurantName: "Restaurant",
        PostHeader: "I am Gbond_A. This restaurant is good.",
        hashtag_list: [{ "name": '#Yummy', "frequency": 11 }, { "name": '#Juicy', "frequency": 22 }],
        image_set: ["/img/feed_all/1.jpg", "/img/feed_all/2.jpg", "/img/feed_all/3.jpg"],
        comment:[
            {"icon":"/img/feed_all/user.png","name":"comment1","content":"I think so"},
            {"icon":"/img/feed_all/user.png","name":"comment2","content":"I think so too"},
            {"icon":"/img/feed_all/user.png","name":"comment3","content":"Me too"}
        ]
    };
    return data ;
}

const Post = (postid) => {
    const data = DataLoader(postid);

    return (
        
        <Container className="pb-5 mt-5" style={{ borderBottomStyle: "solid", borderColor: "LightCoral" ,fontSize: "1.3vw"}}>
            <Row>
                <Col xs="1">
                    <Row><img src={data.UserIcon}  alt="mATE." className="mx-auto my-2 img-fluid"></img></Row>
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
                                <img className="d-block w-100" src={image} alt = {image + idx} />

                            </Carousel.Item>
                        )
                        }
                        </Carousel>
                    </Row>

                    <Row className="mb-4" >
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
                                <img src={comment_item.icon} height="30" width="30" alt="mATE." className="mx-auto my-2"></img>
                            </Col>
                            <Col xs="2" className="my-auto"><span style={{ color: "LightCoral", fontWeight: "800" }}>{comment_item.name}</span></Col>
                            <Col xs="8" className="my-auto"><p style={{overflowWrap: "break-word" , margin: "3%"}}>{comment_item.content}</p></Col>
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

export {Feed,Post};