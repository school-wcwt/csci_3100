import React from "react";
import { useForm } from "react-hook-form";
import { Paper,makeStyles,TextField,CircularProgress } from "@material-ui/core";
import bg_img from './img/8.jpg';
import {Nav} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import axios from '../../axiosConfig';
import { history, uploadPhoto } from 'component'
import { Auth } from 'component/authService'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Form} from 'react-bootstrap';
import {NavBar} from 'component'

const useStyles = makeStyles((theme) => ({ 
    bgImg:{
        //backgroundImage: `linear-gradient(rgba(0, 0, 0,0.7),rgba(0, 0, 0,0.7)),url(${piazzaImg})`,
        backgroundImage:　`linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${bg_img})`,
        opacity: "1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItmes: 'center',
    },
    paper_style: {
        maxWidth: 600,
        margin: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: "rgb(255, 255, 255,0.85)",
    },
    sharedRow: {
        display: 'inline-flex',
        width: "100%",
        gap: theme.spacing(2),
    },
    textField_small: {
        flex: 1,
    },
    main_button_style: {
        flex: 1,
        fontWeight: 700,
        fontFamily: "Poppins",
        color: theme.palette.grey[200],
        backgroundColor: theme.palette.primary.main,
    },
    button_style: {
        flex: 1,
        fontWeight: 700,
        fontFamily: "Poppins",
        color: theme.palette.grey[700],
    },
    welcome_message:{
        ...theme.typography.h6
    },
    upload_button:{
        '& > *': {
            margin: theme.spacing(1),
          },
        },
    input: {
        display: 'none',
    },
}));

const TextBox = ({required, label,dataName,type,register}) => {
    const classes = useStyles();
    if (!type)  type = "text";
    return (
        <TextField fullWidth required={required} margin="normal" inputRef={register}
        id={dataName} label = {label} name = {dataName} type={type} />
    );
}
const TextBoxSmall = ({label,dataName,type,defaultValue,register}) => {
    const classes = useStyles();
    if (!type)  type = "text";
    return (
        <TextField className={classes.textField_small} margin="normal" inputRef={register}
        id={dataName} label = {label} name = {dataName} type={type} defaultValue={defaultValue}/>
    );
}

const Register_DataBase = data =>{


    uploadPhoto(data.photo).then(downloadURL => {


    console.log("Process on Create Rest");
    const mydata = {
        type: "Rest",
        username: data.RestName,
        address: data.Address,
        email :data.email,
        name: data.nickName?data.nickName:data.RestName,
        phone: data.phone?data.phone.trim():0,
        profPhoto: downloadURL,
        status: data.status?data.status:"Aviliable",
        openingHr: [data.starttime,data.endtime],
    };
    console.log(JSON.stringify(mydata))
    axios(
        {
        method: 'POST',
        url: '/entity/new',
        data: mydata
    }
    )
    .then(res => {
        console.log(res);
        alert("Register sucess");
        history.push(`/profile/${res.data.entityID}`);

    })
    .catch(err => {
        console.log(err.message);
    })

})
};

/**
 * - Let user fill in Restaurant's data for creation. 
 * - Then Pass data to DB and redirect user to Main Page After creation
 * @returns Creat Restaurant Form UI
 */

const RestForm = (props) => {
    var nummberOfFile = 0;
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);
    const CancelOnCick = () =>{
        history.push('/');
    };

    const onSubmit = data => {
        setLoading(true);
        if (Register_DataBase(data)==false)    setLoading(false);
    };

   const RestStatusLabel = ["Aviliable","Closed Already"];
   const [RestStatus, setRestStatus] = React.useState("Aviliable");
   const handleChange = (event) => {
    setRestStatus(event.target.value);
  };
  //defaultValue
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Nav className={classes.welcome_message}> Enter a new restaurant!</Nav>
        <TextBox required label = "English Name" dataName ="RestName" register = {register}/>
        <TextBox label = "Chinese Name" dataName ="nickName" register = {register}/>
        <TextBox required label = "Email" dataName ="email" type = "email" register = {register}/>
        <TextBox required label = "Address" dataName ="Address" register = {register}/>
        <TextBox label = "Contact Number" dataName ="phone" type = "phone" register = {register}/>
        <div className={classes.sharedRow}>
            <TextBoxSmall label = "Opening Hour" defaultValue="09:00"  dataName = "starttime" variant="outlined" register = {register}/>
            <TextBoxSmall label = "Closing Hour" defaultValue="20:00"  dataName = "endtime" variant="outlined" register = {register}/>
        </div>
        <Form.File type="file" name="photo" ref={register}/>
        <br/>
        <div className={classes.sharedRow}>
            <Button variant="contained" type="submit" size="large" onClick = {handleSubmit(onSubmit)} className={classes.main_button_style}>
                Create Restaurant Now
            </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />} 
            <Button variant="outlined" size="large" className={classes.button_style} onClick = {CancelOnCick} >
                Cancel
            </Button>
        </div>
    </form>
    )

}
/**
 * - Let user fill in Restaurant's data for creation. 
 * - Then Pass data to DB and redirect user to Main Page After creation
 * @returns Creat Restaurant Form Page
 */
const CreateRest = ()=>{
    const classes = useStyles();
    Auth();
    return (
        <>
        <NavBar/>
        <div className = {classes.bgImg}>
            <div className={classes.root}>
            <Paper className = {classes.paper_style} elevation={3} variant="outlined">
                <RestForm/>
            </Paper>
            </div>
        </div>
        </>
    )
}


export default CreateRest;


/*
Input item
data {
    type
}
*/