import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
  const classes = useStyles();

  return (
    <div alignItems="center">
        <form className={classes.root} noValidate autoComplete="off">
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
                label="Username"
                variant="outlined"
            />
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="outlined"
            />
            <Button variant="outlined" color="primary">
                Log In
            </Button>
            </Grid>
        </form>
    </div>
  );
}