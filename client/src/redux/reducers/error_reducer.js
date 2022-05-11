import * as actionType from '../actions/types';

const errorReducer = (state = { }, action) => {
  switch (action.type) {
    case actionType.API_ERROR:
        return {
            ...state, 
            // errorMessage : action.data
            errorMessage : action.data.data.message
        }
    default:
      return state;
  }
};
  
  export default errorReducer;