//next: use filter
import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect, useCallback } from "react";
import { socket, trigChange, detectChange } from "../socket-client/socket-client.js"
import Post from "./post"
import Loading from '../loading.js';
import Error404 from '../Error404.js';

const postFn = require("../load_backend/postFunction.js");

export default function Posts(props) {
  const [fetched, setFetched] = useState(false)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    postFn.post_post(props.filter)
    .then(posts => {
      setPosts(posts)
      setFetched(true)
    })
    .catch(err => console.log(err))
  }, [])

  if (!fetched) return <Loading/>
  else if (fetched && posts == null) return <Error404/>
  else return (
    posts.map(data2 => {
      return <Post post={data2} {...props} key={data2.postID}/>
    })
  )
}