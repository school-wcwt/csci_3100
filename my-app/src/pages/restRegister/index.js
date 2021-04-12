import React from "react";
import { useForm } from "react-hook-form";
import { Paper,makeStyles,TextField,CircularProgress } from "@material-ui/core";
import bg_img from './img/8.jpg';
import {Nav} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import axios from '../../axiosConfig';
import history from '../history';
import {Auth} from '../services/authService';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Upload_Photo} from '../../component/Upload/upload';
import {Form} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({ 
    bgImg:{
        //backgroundImage: `linear-gradient(rgba(0, 0, 0,0.7),rgba(0, 0, 0,0.7)),url(${piazzaImg})`,
        backgroundImage:　`linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${bg_img})`,
        opacity: "1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
    },

    paper_style: {
        position: "relative",
        top:"12%",
        left:"26%",
        width:"45%",
        backgroundColor : "rgb(255, 255, 255,0.85)",
        },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "96%",
    },
    textField_small: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "47%",
    },
    main_buttom_style: {
        margin: theme.spacing(1),
        height: "8vh",
        width: "55%",
        [theme.breakpoints.up("lg")]: {
            width: "55%",
        }
    },
    buttom_style: {
        margin: theme.spacing(1),
        height: "8vh",
        width: "40%",
        [theme.breakpoints.up("lg")]: {
            width: "40%",
        }
    },
    welcome_message:{
        color: "LightCoral", 
        fontWeight:800,
        margin: "0 auto",
        padding: "2%",
        paddingLeft:"5%",

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

const TextBox = ({label,dataName,type,register}) => {
    const classes = useStyles();
    if (!type)  type = "text";
    return (
        <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
        id={dataName} label = {label} name = {dataName} type={type} />
    );
}
const TextBoxSmall = ({label,dataName,type,defaultValue,register}) => {
    const classes = useStyles();
    if (!type)  type = "text";
    return (
        <TextField className={classes.textField_small} margin="normal" variant="outlined" inputRef={register}
        id={dataName} label = {label} name = {dataName} type={type} defaultValue={defaultValue}/>
    );
}

const Register_DataBase = data =>{


    Upload_Photo(data.photo).then(downloadURL => {


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
        <Nav className={classes.welcome_message} >Welcome to Create a new Restaurant. Please Fill in the Following Information</Nav>
        <TextBox label = "Restaurant Name" dataName ="RestName" register = {register}/>
        <TextBox label = "Email (For reservation )" dataName ="email" type = "email" register = {register}/>
        <TextBox label = "Address" dataName ="Address" register = {register}/>
        <TextBox label = "Any Nick name or Chinese Name" dataName ="nickName" register = {register}/>
        <TextBox label = "Contact Number" dataName ="phone" type = "phone" register = {register}/>
        <TextBoxSmall label = "Opening Hour" defaultValue="09:00"  dataName = "starttime" variant="outlined" register = {register}/>
        <TextBoxSmall label = "Closing Hour" defaultValue="20:00"  dataName = "endtime" variant="outlined" register = {register}/>
        <Form.File type="file" name="photo" ref={register}/>
        <br/>
        <Button variant="contained" type="submit" size="large" color="primary" onClick = {handleSubmit(onSubmit)} className={classes.main_buttom_style} component="span" >
        <Nav className={classes.welcome_message} style={{color:"#FFF8DC"}}>Create Restaurant Now</Nav>
        </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />} 
        <Button variant="contained" size="large" color="secondary" className={classes.buttom_style} component="span" onClick = {CancelOnCick} >
        <Nav className={classes.welcome_message} style={{color:"#FFF8DC"}}>Cancel</Nav>
        </Button>
    </form>
    )

}
const RestRegister = ()=>{
    const classes = useStyles();
    Auth();
    return (        
        <div className = {classes.bgImg}>
            <Paper className = {classes.paper_style} elevation={3} variant="outlined">
            <RestForm/>
            </Paper>
        </div>

    )
}


export default RestRegister;


/*
Input item
data {
    type
}
*/