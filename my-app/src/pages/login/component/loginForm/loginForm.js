import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { makeStyles,TextField } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({ 
    input_style:{
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "95%",
    },
}));

/*        <TextField
          id="outlined-search"
          label={label}
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          inputRef={register({ required })}
        />
*/
//<input name={label} ref={register({ required })} className = {classes.input_style}/>
const Input = ({ label, register, required }) => {
    const classes = useStyles();
    return (
    <>
        <label>{label}</label>
        <br/>
        <TextField
          id="outlined-search"
          label = {label}
          name = {label}
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          inputRef={register({ required })}
        />
        <br/>
    </>
    );
}

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ label }, ref) => (
  <>
    <label>{label}</label>
    <select name={label} ref={ref}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(JSON.stringify(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="User Name" register={register} required />
      <Input label="Password" register={register} required />
      <input type="submit"></input>
    </form>
  );
};

export default LoginForm;