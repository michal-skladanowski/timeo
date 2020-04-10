const initState = {
  records: []
};
const recordsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return {
        ...state,
        records: [action.record, ...state.records]
      };
    case "DELETE_RECORD":
      return {
        ...state
      };
    default:
      return state;
  }
};

export default recordsReducer;
