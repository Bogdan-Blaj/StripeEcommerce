import React from 'react';
import MyButton from '../Utils/button';
import Login from './login';
// import {withRouter } from 'react-router-dom';

const RegisterLogin = () => {
        return (
            <div>
                <div className="page-wrapper">
                    <div className="container">
                        <div className="register_login_container">
                            <div className="left">
                                <h1>New Customers</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil animi facilis itaque quis saepe minima repudiandae porro nisi, quasi quo numquam ratione et ipsum suscipit explicabo culpa inventore iure cumque?</p>
                                <MyButton
                                    type = "default"
                                    title = "Create an account"
                                    linkTo = "/register"
                                    addStyles = {{
                                        margin : '10px 0 0 0'
                        }}
                                />
                            </div>
                            <div className="right">
                                    <h2>Registered Customers</h2>
                                    <p>If you have an account please log in</p>
                                    <Login />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default RegisterLogin