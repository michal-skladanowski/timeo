const initState = {
  projects: []
};
const projectsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [action.project, ...state.projects]
      };
    default:
      return state;
  }
};

export default projectsReducer;
