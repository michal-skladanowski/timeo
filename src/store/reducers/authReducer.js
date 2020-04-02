const initState = {};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNIN_ERROR":
      return {
        ...state,
        authError: "Login failed"
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    default:
      return state;
  }
};

export default authReducer;
