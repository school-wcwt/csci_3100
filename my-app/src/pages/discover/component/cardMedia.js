import { useState, useEffect } from 'react';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-bootstrap';

import { Card, CardActionArea, CardContent, CardMedia,
         Typography, Avatar, Tooltip, CircularProgress } from '@material-ui/core';
import { LocationOnRounded } from '@material-ui/icons'

import {Rating, Loading, history } from 'component'
import axios from '../../../axiosConfig'
import Hashtags from './Hashtags'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: theme.spacing(2, 0),
    textAlign: 'center',
    minHeight: 693,
  },
  photoAndRest: {
    position: 'relative',
  },
  content: {
    margin: theme.spacing(5, 0, 0),
    display: 'flex',
    maxWidth: 400,
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    position: 'absolute',
    left: '50%',
    top: '100%',
    margin: -theme.spacing(5),
    zIndex: 1,
  },
  carousel: {
    aspectRatio: 1,
    width: '100%',
  },
  carouselImg: {
    aspectRatio: 1,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    objectFit: 'contain',
    backgroundColor: darken(theme.palette.background.default, 0.05)
  },
  location: {
    margin: theme.spacing(2),
    color: theme.palette.grey[400],
  },
}));

export default function RestCard(props) {
  const classes = useStyles();
  const [images, setImages] = useState(null)
  const [tags, setTags] = useState(null)

  const fetchImage = () => {
    axios.post('/post/', {filter: {target: props.rest._id, type: 1}})
    .then(res => {
      if (res.data != null) {
        let image = []
        res.data.map(rest => image.push(...rest.photo))
        setImages(image)
      } else setImages([])
    })
  }

  const fetchTag = () => {
    axios.post('/hashtag/', {restFilter: {_id: props.rest._id}})
    .then(res => {
      let tags = res.data
      for (let i = res.data.length; i < 3; i++)
        tags.push({name: '-', frequency: 0})
      setTags(tags)
    })
  }

  useEffect(() => {
    fetchImage()
    fetchTag()
  }, [])

  const handleClick = () => {
    history.push(`/profile/${props.rest.entityID}`)
  }

  if (images == null || tags == null) return <Card className={classes.root} />
  return (
    <Card className={classes.root}>

      {/* Photo and Avatar */}
      <CardMedia className={classes.photoAndRest}>
        <Carousel fade className={classes.carousel} indicators={false}>
          {images.map((image, idx) => (
              <Carousel.Item>
                <img className="d-block w-100" src={image} alt={image+idx} className={classes.carouselImg}/>
              </Carousel.Item>
          ))}
        </Carousel>
        <Avatar variant='circular' className={classes.avatar}
          alt={props.rest.entityID} src={props.rest.profPhoto[0]} />
      </CardMedia>

      {/* Infos */}
      <CardActionArea onClick={handleClick}>
        <CardContent className={classes.content}>
          <Tooltip title={`#${props.rest.tag}`} arrow>
            <Typography variant='h5'> {props.rest.username} </Typography>
          </Tooltip>
          <Typography variant='body1'> {props.rest.name ? props.rest.name : '-'} </Typography>
          {props.rest.post.length !== 0
            ? <Rating rating={props.rest.rating / props.rest.post.length} /> : <Rating rating={0} />}
          <Tooltip title={props.rest.address}>
            <LocationOnRounded className={classes.location}/>
          </Tooltip>
          {tags !== null
            ? <Hashtags hashtag={tags} limit={3} />
            : null}
        </CardContent>
      </CardActionArea>

    </Card>
  );
}