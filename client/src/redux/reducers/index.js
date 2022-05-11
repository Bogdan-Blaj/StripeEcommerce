import { combineReducers } from 'redux';
import user from './user_reducer';
import authReducers from './auth_reducers';
import error from './error_reducer';

const rootReducer = combineReducers({
    user,
    authReducers,
    error
});

export default rootReducer;