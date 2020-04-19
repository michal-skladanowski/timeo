export const orderItems = order => {
  return dispatch => {
    dispatch({ type: "ORDER_ITEMS", order });
  };
};
export const loadMoreItems = view => {
  return dispatch => {
    dispatch({ type: "LOAD_MORE_ITEMS", view });
  };
};
