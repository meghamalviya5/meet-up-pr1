import React, { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import "./Events.css";
import { Link } from "react-router-dom";

const Events = () => {
  const { filteredEvents, dispatch } = useContext(EventContext);

  return (
    <div className="flex flex-dir-col">
      <div className="flex flex-space-between pt-s pb-s">
        <h2>MeetUp Events</h2>
        <select
          className="border-none br-s event-type-select"
          onChange={(e) =>
            dispatch({ type: "SEARCH_BY_TYPE", payload: e.target.value })
          }
        >
          <option disabled selected>
            Search by Event type
          </option>
          <option value="Offline">Offline</option>
          <option value="Online">Online</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div className="flex event-card-container flex-wrap">
        {filteredEvents.map((event) => {
          const { id, title, eventStartTime, eventThumbnail, eventType } =
            event;
          return (
            <Link
              className="link"
              to={`/event-details/${id}`}
              onClick={() => {
                dispatch({
                  type: "UPDATE_RSVP_STATUS",
                  payload: { key: "rsvpText", value: "RSVP" },
                });
                dispatch({
                  type: "UPDATE_RSVP_STATUS",
                  payload: { key: "rsvpBtnDisable", value: false },
                });
              }}
            >
              <div key={id} className="flex event-card relative">
                <div>
                  <img src={eventThumbnail} alt="event" />
                  <p className="flex flex-gap-1 flex-align-center grey-color">
                    <span>{new Date(eventStartTime).toDateString()}</span>{" "}
                    <span className="flex">
                      <svg width="4" height="4">
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          stroke-width=""
                          fill="grey"
                        />
                      </svg>
                    </span>
                    <span>
                      {new Date(eventStartTime).toLocaleTimeString()} IST
                    </span>
                  </p>
                  <h3>{title}</h3>
                </div>
                <div className="absolute event-type">
                  <p>{`${eventType} Event`}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
