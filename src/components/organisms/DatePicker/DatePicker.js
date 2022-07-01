import React from "react";

const DatePicker = ({
  value = null,
  onChangeHandler = () => {},
  errorCondition = false,
}) => {
  const val = !!value ? value : "";
  return (
    <div className="flex space-between">
      <label className="border-green padding_8">Date </label>
      <div className="relative">
        <input
          type="date"
          className="border-green padding_8"
          value={val}
          onChange={onChangeHandler}
        />
        {errorCondition && <p className="error">Kindly enter valid date</p>}
      </div>
    </div>
  );
};

export default DatePicker;
