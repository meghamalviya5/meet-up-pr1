import { createContext, useReducer } from "react";
import { eventReducer } from "../reducers/EventReducer";
import { data } from "../db/data";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const initialState = {
    events: data.meetups,
    searchFilters: { searchByTitleAndTag: "", searchByEventType: "" },
    rsvpModalStatus: false,
    rsvpText: "RSVP",
    rsvpBtnDisable: false,
  };
  const [state, dispatch] = useReducer(eventReducer, initialState);

  let filteredEvents = data.meetups;

  if (state.searchFilters.searchByTitleAndTag.length > 0) {
    filteredEvents = state.events.filter(
      (event) =>
        event.title
          .toLowerCase()
          .includes(state.searchFilters.searchByTitleAndTag.toLowerCase()) ||
        event.eventTags.filter((tag) =>
          tag
            .toLowerCase()
            .includes(state.searchFilters.searchByTitleAndTag.toLowerCase())
        ).length > 0
    );
  }

  if (state.searchFilters.searchByEventType.length > 0) {
    if (state.searchFilters.searchByEventType !== "both") {
      filteredEvents = filteredEvents.filter(
        (event) => event.eventType === state.searchFilters.searchByEventType
      );
    }
  }

  const valueProp = { state, dispatch, filteredEvents };

  console.log("in context");

  return (
    <EventContext.Provider value={valueProp}>{children}</EventContext.Provider>
  );
};

export default EventProvider;
