const initState = {
  dashboardView: { orderBy: "createdAt", sortType: "desc", queryPage: 1 },
  projectView: { orderBy: "createdAt", sortType: "desc", queryPage: 1 },
  projectsView: { orderBy: "createdAt", sortType: "desc", queryPage: 1 }
};
const queryReducer = (state = initState, action) => {
  switch (action.type) {
    case "ORDER_ITEMS":
      console.log(action);
      return {
        ...state,
        [action.order.view]: {
          ...state[action.order.view],
          orderBy: action.order.orderBy,
          sortType: action.order.sortType
        }
      };
    case "LOAD_MORE_ITEMS":
      return {
        ...state,
        [action.view]: {
          ...state.dashboardView,
          queryPage: state[action.view].queryPage + 1
        }
      };
    default:
      return state;
  }
};

export default queryReducer;
