const initState = {
  records: [
    {
      id: "1",
      description: "Lorem ipsum",
      timestamp: 60000,
      createdAt: 1585595526000
    },
    {
      id: "2",
      description: "Lorem ipsudm",
      timestamp: 158000,
      createdAt: 1585295526000
    }
  ]
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
