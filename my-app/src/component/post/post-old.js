//next: use filter
import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect, useCallback } from "react";
import { socket, trigChange, detectChange } from "../socket-client/socket-client.js"


const postFn = require("../load_backend/postFunction.js");

const Post = (props) => {
    const [posts, setPosts] = useState(null)
    const get_function = async (targetFilter) => {
        console.log('get_function called')
        try {
            var posts1 = await postFn.post_post(targetFilter);
            setPosts(posts1)
            console.log('get_function called success')
        }
        catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        get_function()
        detectChange(get_function)
    }, [])


    if (posts == null)
        return (<div>
            <p>'Loading'</p>
            <button onClick={event =>{get_function(props.filter)}}>Click me!</button>
        </div>)
    else {
        return (                                        
            posts.map(data2 => {
                return (
                    <Container className="pb-5 mt-5" style={{ borderBottomStyle: "solid", borderColor: "LightCoral", fontSize: "1.3vw" }}>
                        <Row>
                            <Col xs="1">
                                <Row><img src={data2.author.profPhoto} alt="Author photo." className="mx-auto my-2 img-fluid"></img></Row>
                                <Row><i className="fa fa-ellipsis-h mx-auto my-2" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                                <Row><i className="fa fa-heart-o mx-auto my-2" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                                <Row><i className="fa fa-comment-o mx-auto my-2" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                                <Row><i className="fa fa-bell-o mx-auto my-3" style={{ color: "LightCoral", fontSize: "2em" }}></i></Row>
                            </Col>

                            <Col xs="10" className="pl-5">
                                <Row className="mt-4">
                                    <div><span style={{ color: "LightCoral", fontWeight: "800" }}>{data2.author.username}</span> posted on {data2.createdTime} at <span style={{ color: "LightCoral", fontWeight: "800" }}>{data2.target.username}</span>
                                    </div>
                                </Row>

                                <Row className="my-3 ml-4">{data2.content}</Row>

                                <Row className="mb-4">
                                    <Carousel fade className="w-100">
                                        {
                                            data2.photo.map(
                                                (image, idx) =>
                                                    <Carousel.Item style={{ height: "auto" }}>
                                                        <img className="d-block w-100" src={image} alt={image + idx} />
                                                    </Carousel.Item>
                                            )
                                        }
                                    </Carousel>
                                </Row>

                                <Row className="mb-4" >
                                    {
                                        data2.hashtag.map(
                                            (hashtag, idx) =>
                                                <a href={"#" + idx} className="badge mr-2 text-light" style={{ backgroundColor: "LightCoral" }}>
                                                    <Col> {hashtag.name}</Col>
                                                </a>
                                        )
                                    }
                                </Row>
                                {
                                    data2.comment.map((comment_item) =>
                                        <Row>
                                            <Col xs="1" className="my-auto">
                                                <img src={comment_item.author.profPhoto} height="30" width="30" alt="comment author photo." className="mx-auto my-2"></img>
                                            </Col>
                                            <Col xs="2" className="my-auto"><span style={{ color: "LightCoral", fontWeight: "800" }}>{comment_item.author.username}</span></Col>
                                            <Col xs="8" className="my-auto"><p style={{ overflowWrap: "break-word", margin: "3%" }}>{comment_item.content}</p></Col>
                                        </Row>
                                    )
                                }
                            </Col>

                        </Row>
                    </Container>
                )
            })
        )
    }
}

export { Post };