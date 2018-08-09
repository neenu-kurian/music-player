import {SET_TOKEN} from '../actions/tokenActions'

//reducer to store token
export default(state = {}, action) => {
  switch (action.type) {

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};
