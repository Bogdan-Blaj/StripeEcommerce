import axios from 'axios';
import axiosInstance from '../../axios/axiosConfig';
import { USER_SERVER } from '../../components/Utils/misc';
import {
    AUTH,
    TEST_TOKEN,
    API_ERROR
} from './types';

export const loginUser = (dataToSubmit, router) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post(`${USER_SERVER}/login`, dataToSubmit)
        dispatch({type: AUTH, data});
        router.push('/');
    } catch (error) {
        console.log(error);
      }
}

export const registerUser = (dataToSubmit, router) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post(`${USER_SERVER}/register`, dataToSubmit)
        dispatch({type: AUTH, data});
        router.push('/');
    } catch (error) {
        console.log(error);
      }
}

export const testToken = (dataToSubmit, router)  => async (dispatch) => {
    try {
        axiosInstance.interceptors.request.use((req) => {
            if (localStorage.getItem('profile')) {
                req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
              }
              return req; 
        })
        const  data  = await axiosInstance.get(`${USER_SERVER}/testToken`, dataToSubmit)
        if(data.status == '200'){
            dispatch({type: TEST_TOKEN, data})
            router.push('/');
        } else {
            dispatch({type: API_ERROR, data})
        }
        
    } catch (error) {
        console.log(error);
      }
}