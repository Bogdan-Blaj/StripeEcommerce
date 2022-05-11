import React, {useState} from 'react';
import { Button, Container, Paper,  Typography, Grid, Avatar} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../redux/actions/types';
import { loginUser, registerUser } from '../../redux/actions/user_actions';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const handleShowPassword = () => {setShowPassword((prevShowPassword) => !prevShowPassword)};

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };

    const googleError = (error) => {
        console.log(error);
        alert('Google Sign In was unsuccessful. Try again later')
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSignup) {
            //register
          dispatch(registerUser(form, history));
        } else {
            //login
          dispatch(loginUser(form, history));
        }
      };

    return (
            <Container component="main" maxWidth="xs"> 
                <Paper className={classes.paper} elevation = {3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography varian="h5"> 
                        {
                            isSignup ? 'Sign Up' : 'Sign In'
                        } 
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing = {2}>
                            {
                                isSignup && (
                                    <React.Fragment>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </React.Fragment>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"  />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {
                            isSignup ? 'Sign Up' : 'Sign In'
                        }
                        </Button>
                        <GoogleLogin 
                            clientId="847853653438-jnssqhbigrlospc9h1dd9ef7thf9o7vh.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color='primary' 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon/>} 
                                    variant="contained" 
                                > 
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
    )
}

export default Auth;