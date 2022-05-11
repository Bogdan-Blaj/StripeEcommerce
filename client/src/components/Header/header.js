import React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button, Container } from '@material-ui/core';
import useStyles from './styles';
import * as actionType from '../../redux/actions/types';
import {testToken} from '../../redux/actions/user_actions';

const Header = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
        history.push('/auth');
    
        setUser(null);
      };

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);


    return (
        <Container>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" className={classes.menu_item} component={Link}  to="/auth" >
                    About
                </Typography>
                <Typography variant="h6" color="inherit" className={classes.menu_item} component={Link}  to="/auth" >
                    Features
                </Typography>
                <Typography variant="h6" color="inherit" className={classes.menu_item} component={Link}  to="/auth" >
                    Contact
                </Typography>                                


                {user?.result ? (
                    <div className={classes.profile}>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" className={classes.menu_button}>Sign In</Button>
                )}
            </Toolbar>  
        </Container>   
    )
}

export default Header;