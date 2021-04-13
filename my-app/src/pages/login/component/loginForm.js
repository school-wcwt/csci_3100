import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, CircularProgress, Button } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';

import axios from '../../../axiosConfig';
import history from "../../history";
import useStyles from '../styles/formStyle'

import global from '../../../component/global'

const LoginForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errormessage,setmessage] = useState('');
    const { register, handleSubmit } = useForm();
    const styles = useStyles();

    const onSubmit = data => {
        setLoading(true);
        const body = {
            filter: {email: data.email},
            password: data.password
        }
        axios.post('/login', body)
        .then(res => {
            setLoading(false);
            setSuccess(true);
            document.cookie = "state=" + res.data.entityID;
            document.cookie = "myuser=" + JSON.stringify(res.data);
            console.log(`Logged in as ${res.data.entityID}`);
            global.loginedUser.setUser(res.data);
            setTimeout(() => {
                history.push('/main');
            }, 1500)
        })
        .catch(err => {
            setmessage("password / User Mail Error, Please Try again");
            setLoading(false);
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flexContainer}>
            <TextField fullWidth margin='dense' inputRef={register}
                required id="email" label="Email" name="email" type="email" error = {errormessage!=''} helperText = {errormessage} />
            <TextField fullWidth margin='dense' inputRef={register}
                required id="password" label="Password" name="password" type="password" />
            <div className={styles.buttonWrapper}>
                <Button fullWidth variant="contained" disabled={loading || success} type="submit" 
                    className={success ? styles.successButton : styles.primaryButton}>
                    {success ? <CheckIcon className={styles.checkIcon}/> : 'Login'}
                </Button>
                {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
            </div>
            <Button fullWidth variant="outlined" className={styles.secondaryButton} onClick={props.setPanel}>
                Register
            </Button>
        </form>
    );
};

export default LoginForm;