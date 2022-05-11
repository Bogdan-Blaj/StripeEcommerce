import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../Utils/Form/formField';
import { update, generateData, isFormValid } from '../Utils/Form/formActions';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../redux/actions/user_actions';


class Login extends Component {

    constructor(){
        super();
        this.state = {
            formError : false,
            formSuccess : '',
            formData : {
                email : {
                    element : 'input',
                    value : '',
                    config : {
                        name : 'email_input',
                        type : 'email',
                        placeholder : 'Enter your email'
                    },
                    validation : {
                        required : true,
                        email : true
                    },
                    valid : false,
                    touched : false,
                    validationMessage : ''
                },
                password : {
                    element : 'input',
                    value : '',
                    config : {
                        name : 'password_input',
                        type : 'password',
                        placeholder : 'Enter your password'
                    },
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false,
                    validationMessage : ''
                }
            }
        };
    }



    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'login');
        this.setState({
            formError : false,
            formData : newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'login');
        let formIsValid = isFormValid(this.state.formData, 'login');

        if(formIsValid){
            //dispatch action with redux
            this.props.dispatch(loginUser(dataToSubmit)).then(response => {
                if(response.payload.loginSuccess){
                    this.props.history.push('/user/dashboard');
                }else {
                    this.setState({
                        formError : true
                    });
                }
            });
        } else {
            this.setState({
                formError : true
            })
        }
    }

    render() {
        return (
           <div className="signin_wrapper">
            <form onSubmit = { (event) => this.submitForm(event)}>
                <FormField id = {'email'} formData = { this.state.formData.email} change = { (element => this.updateForm(element)) } 
                />

                <FormField id = {'password'} formData = { this.state.formData.password} change = { (element => this.updateForm(element)) } 
                />
                {this.state.formError ?
                    <div className="error_label">
                        Please check your data
                    </div>    
                : null}
                <button onClick = {(event) => this.submitForm(event)}>Login</button>
            </form>
           </div>
        )
    }
}
//with Router for the props to be injected to the parent, this case is needed to get to the new page
export default connect()(withRouter(Login));
