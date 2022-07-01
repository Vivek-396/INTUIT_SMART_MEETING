import React, { useState } from "react";
import cx from "classnames";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const RoomsListing = ({ allData = null }) => {
  const [isError, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const buildingName = location.state.building || "";
  const selectedBuilding =
    (!!allData &&
      !!allData.Buildings &&
      allData.Buildings.filter((building) => building.name === buildingName)) ||
    null;
  const meetingRooms =
    (!!selectedBuilding &&
      !!selectedBuilding[0] &&
      selectedBuilding[0].meetingRooms) ||
    [];

  const onSaveClick = () => {
    const meetingRoomMeta = meetingRooms[selectedIndex];
    const meetingDetails = location.state || null;
    const config = { headers: { token: "a123gjhgjsdf6576" } };
    const url = "http://smart-meeting.herokuapp.com/";
    const payload = {
      query: `mutation{Meeting(id: ${meetingRoomMeta.id}, title: "Ready for Interview",date: "${meetingDetails.date}",startTime: "${meetingDetails.startTime}",endTime: "${meetingDetails.endTime}",meetingRoomId:${meetingRoomMeta.id} ) {id,title}}`,
    };

    axios
      .post(url, payload, config)
      .then((res) => {
        // NOTE :: If errors exists even with status 200
        if (!!res.data.errors && !!res.data.errors.length) {
          setError(true);
        } else {
          // NOTE :: Redirect to homepage on success
          navigate("/");
        }
      })
      .catch(() => setError(true))
      .finally(() => setSelectedIndex(null));
  };

  const handleRoomClick = (index) => () => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <div className="flex flex-col homepage">
      <h2>Please select one of the free rooms</h2>
      {!!meetingRooms.length ? (
        <>
          {meetingRooms.map((room, index) => (
            <div
              className={cx("border-green padding_x_8 card", {
                selectedRoom: index === selectedIndex,
              })}
              onClick={handleRoomClick(index)}
              key={`Meeting_room_${index + 1}`}
            >
              <p className="font-size_16">{room.name}</p>
              <p>{buildingName}</p>
              <p>Floor {room.floor}</p>
            </div>
          ))}
          <button
            type="button"
            onClick={onSaveClick}
            disabled={selectedIndex == null}
            className={cx("saveBtn margin-top_8 border-radius_10", {
              btnDisabled: selectedIndex == null,
            })}
          >
            Save
          </button>
        </>
      ) : (
        <div>No meeting rooms found.</div>
      )}
      {isError && (
        <p className="error roomListingError">
          Something went wrong. Retry again.
        </p>
      )}
    </div>
  );
};

export default RoomsListing;
