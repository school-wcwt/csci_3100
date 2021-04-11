//next: use filter
import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect, useCallback } from "react";
import { socket, trigChange, detectChange } from "../socket-client/socket-client.js"
import Post from "./post"


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
                return <Post post={data2} {...props}/>
            })
        )
    }
}

export { Posts } ;