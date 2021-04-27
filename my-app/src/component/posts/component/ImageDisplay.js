import { useState } from 'react'
import { darken, makeStyles } from '@material-ui/core/styles'
import { Button, MobileStepper } from '@material-ui/core';
import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  photoImg: {
    aspectRatio: 1,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    objectFit: 'contain',
    backgroundColor: darken(theme.palette.background.default, 0.05)
  },
  stepper: {
    backgroundColor: theme.palette.background.paper
  },
}))

export default function ImageDisplay(props) {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const maxSteps = props.post.photo.length || 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <img className={classes.photoImg} src={props.post.photo[activeStep]}/>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        className={classes.stepper}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
          <KeyboardArrowRightRounded />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeftRounded />
          </Button>
        }
      />
    </>
  )
}