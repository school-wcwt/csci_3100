//next: use filter
import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect, useCallback } from "react";
import { socket, trigChange, detectChange } from "../socket-client/socket-client.js"
import Post from "./post"
import Loading from '../loading.js';


const postFn = require("../load_backend/postFunction.js");

const Posts = (props) => {
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
        get_function(props.filter)
        detectChange(get_function)
    }, [])


    if (posts == null) return <Loading/>
    else return (                                        
        posts.map(data2 => {
            return <Post post={data2} {...props} key={data2.postID}/>
        })
    )
}

export { Posts } ;