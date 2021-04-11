import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, CircularProgress, Button } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import axios from '../../../axiosConfig';
import {send_validation_email} from '../../../component/email/email';
import useStyles from '../styles/formStyle';
//const {send_validation_email} = require();

const RegisterForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({
        username: false,
        password: false,
        confirmpw: false,
    });
    const styles = useStyles();

    const invalidData = data => {
        var validName = /^[0-9a-zA-Z_-]+$/;
        var pwMinLength = 6;
        var flag = false;
        var err = error;
        if (!validName.test(data.username)) {
            err.username = true; flag = true;
        } else err.username = false;
        if (data.password == '' || data.password.length < pwMinLength) {
            err.password = true; flag = true;
        } else err.password = false;
        if (data.password == '' || data.password !== data.passwordCheck) { 
            err.confirmpw = true; flag = true;
        } else err.confirmpw = false;
        setError(err);
        if (flag) return true 
        else return false;
    }
    
    const onSubmit = data => {
        if (invalidData(data)) return;
        setLoading(true);
        const body = {
            type: "User",
            username: data.username,
            email: data.email,
            password: data.password
        };
        const emaildata = {
            to_name: data.username,
            user_email: data.email,
            message: "/ I am messgae"
        };
        axios.post('/register', body)
        .then(res => {
            setLoading(false);
            setSuccess(true);
            //send_validation_email(emaildata);
        })
        .catch(err => console.log(err.message));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flexContainer}>
            <TextField fullWidth margin='dense' inputRef={register} 
                required id="username" label="Username" name="username" type="username"
                error={error.username} helperText={error.username ? 'Incorrect format. Letters, numbers, -, and _ only.' : "Letters, numbers, -, and _ only."} />
            <TextField fullWidth margin='dense' inputRef={register}  
                required id="email" label="Email" name="email" type="email" 
                helperText="Email will be used for verification."/>
            <TextField fullWidth margin='dense' inputRef={register} required 
                id="password" label="Password" name="password" type="password" 
                error={error.password} helperText={error.password ? 'Password too short. (Min: 6 characters)' : "At least 6 characters."}/>
            <TextField fullWidth margin='dense' inputRef={register} required 
                id="passwordCheck" label="Confirm Password" name="passwordCheck" type="password" 
                error={error.confirmpw} helperText={error.confirmpw ? 'Password mismatch.' : "Please type your password again."}/> 
            <div className={styles.buttonWrapper}>
                <Button fullWidth variant="contained" disabled={loading || success} type="submit" 
                    className={success ? styles.successButton : styles.primaryButton}>
                    {success ? 'Check your email!' : 'Let me in!'}
                </Button>
                {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
            </div>
            <Button fullWidth variant="outlined" className={styles.secondaryButton} onClick={props.setPanel}>
                {success ? 'Back to Login' : 'Cancel'}
            </Button>
        </form>
    );
};



export default RegisterForm;