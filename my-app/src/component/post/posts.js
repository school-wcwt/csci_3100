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


<<<<<<< HEAD
    if (posts == null) return <Loading/>
    else return (                                        
        posts.map(data2 => {
            return <Post post={data2} {...props} key={data2.postID}/>
        })
    )
=======
    if (posts == null)
        return (<div>
            <p>'Loading'</p>
            <button onClick={event =>{get_function(props.filter)}}>Click me!</button>
        </div>)
    else {
        return (                                        
            posts.map(data2 => {
                
                return <Post post={data2} {...props} key={data2.postID}/>
            })
        )
    }
>>>>>>> f63a7b2138bcd8ea52755a23244281fa4cbc3b1e
}

export { Posts } ;