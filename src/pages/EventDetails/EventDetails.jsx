import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../../contexts/EventContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faIndianRupeeSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import AddRSVPModal from "../../components/AddRSVPModal/AddRSVPModal";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventID } = useParams();
  const {
    state: { rsvpModalStatus, rsvpText, rsvpBtnDisable },
    filteredEvents,
    dispatch,
  } = useContext(EventContext);

  const selectedEvent = filteredEvents.find((event) => event.id === eventID);

  const {
    title,
    eventStartTime,
    eventEndTime,
    location,
    address,
    eventThumbnail,
    eventDescription,
    hostedBy,

    isPaid,
    eventTags,
    speakers,
    price,
    additionalInformation,
  } = selectedEvent;

  return (
    <div className="flex flex-gap-2 flex-space-between">
      <div className="event-base-details">
        <h2 className="pb-m pt-l">{title}</h2>
        <div className="pb-l">
          <p>Hosted By:</p>
          <strong>{hostedBy}</strong>
        </div>
        <img
          src={eventThumbnail}
          alt="event-thumbnail"
          className="base-image"
        />
        <h3 className="pt-m pb-xs">Details:</h3>
        <p>{eventDescription}</p>
        <div className="flex flex-dir-col flex-gap-1">
          <h3 className="pt-m pb-xs">Additional Information:</h3>
          <p>
            <strong>Dress Code: </strong>
            {additionalInformation.dressCode}
          </p>
          <p>
            <strong>Age Restrictions: </strong>
            {additionalInformation.ageRestrictions}
          </p>
        </div>
        <h3 className="pt-m pb-xs">Event Tags: </h3>
        <ul className="flex flex-gap-2">
          {eventTags.map((tag, id) => (
            <li key={id} className="btn btn-tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-l">
        <div className="event-venue flex flex-dir-col flex-gap-2 p-l br-m mb-xxl">
          <div className="flex flex-gap-2 flex-align-center">
            <FontAwesomeIcon icon={faClock} />
            <div>
              <p>
                {`${new Date(eventStartTime).toDateString()} at ${new Date(
                  eventStartTime
                ).toLocaleTimeString()}`}
              </p>
              <p>
                {`${new Date(eventEndTime).toDateString()} at ${new Date(
                  eventEndTime
                ).toLocaleTimeString()}`}
              </p>
            </div>
          </div>
          <div className="flex flex-gap-2 flex-align-center">
            <FontAwesomeIcon icon={faLocationDot} />
            <div>
              <p>{location}</p>
              <p>{address}</p>
            </div>
          </div>
          <div className="flex flex-gap-2 flex-align-center">
            {isPaid ? <FontAwesomeIcon icon={faIndianRupeeSign} /> : null}
            <p>{price}</p>
          </div>
        </div>
        <div className="flex flex-dir-col flex-gap-2">
          <h3>Speakers: ({speakers.length})</h3>
          <div className="flex flex-gap-2">
            {speakers.map(({ name, image, designation }, id) => (
              <div key={id} className="flex flex-dir-col speaker-card">
                <img
                  src={image}
                  alt="speaker-profile"
                  className="speaker-image"
                />
                <h4>{name}</h4>
                <p>{designation}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-justify-center pt-l">
            <button
              className="btn btn-rsvp txt-center"
              disabled={rsvpBtnDisable}
              onClick={() => {
                dispatch({
                  type: "UPDATE_RSVP_STATUS",
                  payload: { key: "rsvpModalStatus", value: true },
                });
              }}
            >
              {rsvpText}
            </button>
            {rsvpModalStatus ? <AddRSVPModal isPaid={isPaid} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
