import Carousel from "react-material-ui-carousel";
import React from "react";
import _ from "lodash";
//import image1 from "./img/1.jpg";
//import image2 from "../../image/logo.png";
//import image3 from "../../image/logo.png";
import { withStyles } from "@material-ui/core";

var image_set = ["./img/2.jpg","./img/1.jpg","./img/3.jpg"];


const CAROUSEL_BANNERS = [
  {
    priority: 2,
    src: image_set[0],
    href: "https://www.flyingmilktea.com/nation-of-elves",
  },
  {
    priority: 1,
    src: image_set[1],
    href: "https://www.flyingmilktea.com/interprint-discount/",
  },
  {
    priority: 0,
    src: image_set[2],
    href: "https://www.flyingmilktea.com/scarlet-print-discount/",
  },
];
const CAROUSEL_BANNER_PROCESSED = _(CAROUSEL_BANNERS)
  .filter((x) => !x.startDate || Date.now() > x.startDate)
  .filter((x) => !x.endDate || x.endDate > Date.now())
  .shuffle()
  .sortBy((x) => -x.priority)
  .value();

const MainCarousel = withStyles((theme) => ({
  carousel: {
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: -theme.spacing(3),
      marginRight: -theme.spacing(3),
    },
    //marginBottom: -theme.spacing(3),
  },
  carouselImage: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "20%",
  },
  carouselPlaceholder: {
    position: "relative",
    top: "2px",
    width: "20%",
  },
}))(({ classes }) => {
  // 2px * 1px transparent image to reserve the container size
  // fix the flickering when banner image is loading
  // https://www.npmjs.com/package/react-material-ui-carousel
  const twoByOneImg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII=";
  const indicatorContainerStyle = {position:"relative",top:"-40px",zIndex: 1,}
  const activatedotStyle = {color: "rgb(46, 172, 235)",}
  console.log(image_set[1]);
    return (
    <div>
      <Carousel 
        autoPlay={false} interval = {10*1000} fullHeightHover = {true} className={classes.carousel} navButtonsAlwaysVisible={true} animation = "fade"
        activeIndicatorProps = { {style: activatedotStyle } } 
        indicatorContainerProps={ {style:indicatorContainerStyle} }
      >
        {CAROUSEL_BANNER_PROCESSED.map(({ src, href }, idx) => (
          <div key={idx}>
            <img className={classes.carouselPlaceholder} src={twoByOneImg} />
            <a href={href}>
              <img className={classes.carouselImage} src={src} />
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
});

export default MainCarousel;
