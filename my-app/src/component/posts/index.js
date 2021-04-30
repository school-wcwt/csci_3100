//next: use filter
import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect, useCallback } from "react";
import { socket, trigChange, detectChange } from "../socket-client.js"
import Post from "./post"
import Loading from '../loading.js';
import Error404 from '../error404.js';

const postFn = require("../load_backend/postFunction.js");
/**
 * - Generate Posts UI:
 * - Filter format can be view at route POST user/:entityID/post/new in github backend's readme
 * @param {Object} props 
 * @param {Object} props.filter 
 * @return Posts UI
 */
export default function Posts(props) {
  const [fetched, setFetched] = useState(false)
  const [posts, setPosts] = useState(null)

  const fetchPosts = (filter) => {
    postFn.post_post(filter)
    .then(posts => {
      setPosts(posts)
      setFetched(true)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPosts(props.filter)
    detectChange(fetchPosts, props.filter)
    //return () => socket.disconnect();
  }, [props.filter])

  if (!fetched) return <Loading/>
  else return (
    posts.map(data2 => {
      return <Post post={data2} {...props} key={data2.postID}/>
    })
  )
}