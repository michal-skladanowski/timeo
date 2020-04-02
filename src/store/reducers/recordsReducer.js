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
    default:
      return state;
  }
};

export default recordsReducer;
