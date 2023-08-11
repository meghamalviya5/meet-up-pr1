export const eventReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_BY_TITLE_TAG":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          searchByTitleAndTag: action.payload,
        },
      };

    case "SEARCH_BY_TYPE":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          searchByEventType: action.payload,
        },
      };

    case "UPDATE_RSVP_STATUS":
      return { ...state, [action.payload.key]: action.payload.value };

    default:
      return { state };
  }
};
