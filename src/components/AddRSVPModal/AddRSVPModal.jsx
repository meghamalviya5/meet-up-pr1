import React, { useContext, useRef } from "react";
import { EventContext } from "../../contexts/EventContext";

import "./AddRSVPModal.css";

const AddRSVPModal = ({ isPaid }) => {
  const addRSVPModalRef = useRef();

  const { dispatch } = useContext(EventContext);

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(`name - ${data.get("name")} and email - ${data.get("email")}`);
    dispatch({
      type: "UPDATE_RSVP_STATUS",
      payload: { key: "rsvpText", value: "Already RSVPed" },
    });
    dispatch({
      type: "UPDATE_RSVP_STATUS",
      payload: { key: "rsvpBtnDisable", value: "true" },
    });
    dispatch({
      type: "UPDATE_RSVP_STATUS",
      payload: { key: "rsvpModalStatus", value: false },
    });
  };

  return (
    <div
      className="modal"
      ref={addRSVPModalRef}
      onClick={(e) =>
        e.target === addRSVPModalRef.current
          ? dispatch({
              type: "UPDATE_RSVP_STATUS",
              payload: { key: "rsvpModalStatus", value: false },
            })
          : null
      }
    >
      <div className="modal-content relative">
        <div className="modalHeader flex flex-dir-col flex-gap-1">
          <p className="heading">Complete your RSVP</p>
          <p className="sub-heading">Fill in your personal information.</p>
        </div>
        {/* <button
          className="closeBtn"
          onClick={() =>
            dispatch({
              type: "UPDATE_RSVP_STATUS",
              payload: { key: "rsvpModalStatus", value: false },
            })
          }
        >
          X
        </button> */}
        <form
          onSubmit={handleRSVPSubmit}
          className="flex flex-gap-2 flex-dir-col pt-s"
        >
          <div className="flex flex-dir-col">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input id="name" type="text" name="name" className="form-input" />
          </div>
          <div className="flex flex-dir-col">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input id="email" type="text" name="email" className="form-input" />
          </div>
          <p className="caution">
            {isPaid ? "* You have to make payment at the Venue" : null}
          </p>
          <button type="submit" className="w-full btn btn-rsvp">
            RSVP
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRSVPModal;
