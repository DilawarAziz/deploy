let INITIAL_STATE = {
  users: []
 
};


export default function Reducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case "SETDATA":
      // console.log(payload);
      return {
        ...state,
        useruid:action.useruid,
        
      };
    default:
      return state;
  }
}
