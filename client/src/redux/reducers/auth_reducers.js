import * as actionType from '../actions/types';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
      case actionType.TEST_TOKEN:
        return { 
          ...state, 
          authenticated: action.data.authenticated,
          message: action.data.message,
          loading: false, errors: null 
        };
    default:
      return state;
  }
};
  
  export default authReducer;