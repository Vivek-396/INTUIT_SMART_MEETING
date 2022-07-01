import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import BoxWithHeading from "../../molecules/BoxWithHeading";
import { getMeetingsToday } from "./Utils";

import "./index.css";

const Homepage = ({ isLoading, isError, allData }) => {
  useEffect(() => {}, [allData]);
  const d = new Date();
  const { meetingsToday, currentlyOnGoingMeeting } = getMeetingsToday(
    allData,
    d
  );

  return (
    <div className="flex flex-col homepage">
      {isError && (
        <p className="textAlign_center">
          Something went wrong. Please reload again!
        </p>
      )}
      {!isError && (
        <>
          <BoxWithHeading
            wrapperClass="border-green padding_x_8"
            text1={`Total ${isLoading ? "-" : allData.Buildings.length}`}
            text2={null}
            heading="Buildings"
            key="Buildings"
          />
          <BoxWithHeading
            wrapperClass="border-green margin-top_8 padding_x_8"
            text1={`Total ${isLoading ? "-" : allData.MeetingRooms.length}`}
            text2={`Free now ${isLoading ? "-" : allData.MeetingRooms.length}`}
            heading="Rooms"
            key="Rooms"
          />
          <BoxWithHeading
            wrapperClass="border-green margin-top_8 padding_x_8"
            text1={`Total ${isLoading ? "-" : meetingsToday.length || 0} today`}
            text2={`Total ${
              isLoading ? "-" : currentlyOnGoingMeeting
            } going on now`}
            heading="Meetings"
            key="Meetings"
          />
          <Link to="/meetings" className="margin-top_8 meetingBtn">
            Add a Meeting
          </Link>
        </>
      )}
    </div>
  );
};

export default Homepage;
