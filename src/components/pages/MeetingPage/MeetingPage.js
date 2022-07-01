import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";

import TimePicker from "../../organisms/TimePicker";
import DatePicker from "../../organisms/DatePicker";
import Selector from "../../organisms/Selector";
import {
  checkIfToday,
  getSuggestorValue,
  validateDate,
  validateStartTime,
} from "./Utils";

import "./index.css";

const MeetingPage = ({ allData }) => {
  const d = new Date();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [building, setBuilding] = useState(null);

  const onSelectorChange = (e) => {
    if (e.target.value === "None") {
      return setBuilding(null);
    }
    return setBuilding(e.target.value);
  };

  const handleNextClick = () => {
    navigate("/rooms", {
      state: {
        building: building,
        date: date,
        startTime: startTime,
        endTime: endTime,
        meetingRoomId: 4,
      },
    });
  };

  const newDate = new Date(date);
  const buildingsArr = getSuggestorValue(allData);
  const isDateInvalid = validateDate(date, newDate, d);
  const isToday = date != null && checkIfToday(newDate, d);
  const isStartTimeInvalid = validateStartTime(isToday, startTime, d);
  const isEndTimeInvalid = !!startTime && !!endTime && startTime >= endTime;
  const isFormInvalid =
    isDateInvalid ||
    isStartTimeInvalid ||
    isEndTimeInvalid ||
    building === null ||
    !!!startTime ||
    !!!endTime ||
    !!!date;

  return (
    <div className="flex flex-col meeting_page">
      <h2 className="text-center">Add Meeting</h2>
      <div className="padding_x_60">
        <DatePicker
          value={date}
          onChangeHandler={(e) => setDate(e.target.value)}
          errorCondition={isDateInvalid}
        />
        <TimePicker
          labelFor="startTime"
          label="Start Time"
          value={startTime}
          onChangeHandler={(e) => setStartTime(e.target.value)}
          errorCondition={isStartTimeInvalid && !!date}
          errorMsg="Kindly enter valid start time"
        />
        <TimePicker
          labelFor="endTime"
          label="End Time"
          value={endTime}
          onChangeHandler={(e) => setEndTime(e.target.value)}
          errorCondition={isEndTimeInvalid}
          errorMsg="Kindly enter valid end time"
        />
        <Selector
          labelFor="buildings"
          label="Select building"
          value={building}
          onChangeHandler={onSelectorChange}
          selectorArr={buildingsArr}
        />
        <div className="flex justify-center margin-top_16">
          <button
            className={cx("margin-top_8 nextBtn", {
              btnDisabled: isFormInvalid,
            })}
            disabled={isFormInvalid}
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
