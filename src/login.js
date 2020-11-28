import React , { useState } from 'react';
import {Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import 'fontsource-roboto';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToReferer, setredirectToReferer] = useState("");
  const classes = useStyles();
  var emailArray = ["chacha@gmail.com", "inka@gmail.com", "jundu@gmail.com", "admin@gmail.com"];
  var pwArray = ["12345", "inkink", "12345", "admin123"];
  let login = false;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit() {
    console.log(email, password);
    // event.preventDefault();
    for (var i=0; i <emailArray.length; i++) {
        if ((email == emailArray[i]) && (password == pwArray[i])) {
          localStorage.setItem('email', email);
          localStorage.setItem('pw', password);
          setredirectToReferer(true);
          login=true;
        }
    }
    if(!login){
        alert("Wrong username or password");
    }
    // if(email==='chacha@gmail.com'  && password==='12345'){
    //   // return <Redirect to="/home" />;
    //   localStorage.setItem('email', email);
    //   localStorage.setItem('pw', password);
    //   setredirectToReferer(true);
    // }else{
    //   alert("Wrong username or password");
    // }
  }

  if (redirectToReferer) {
    return <Redirect to="/home" />;
  }
  return (
    
    <div alignItems="center">
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
              <h1>Login here</h1>
              <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}                
                  onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                  Log In
              </Button>
            </Grid>
    </div>
  );
}