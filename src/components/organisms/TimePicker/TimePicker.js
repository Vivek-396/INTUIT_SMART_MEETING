import React from "react";

const TimePicker = ({
  label = "",
  labelFor = "",
  value = null,
  onChangeHandler = () => {},
  errorCondition = false,
  errorMsg = "",
}) => {
  const val = !!value ? value : "";
  return (
    <div className="flex space-between margin-top_16">
      <label htmlFor={labelFor} className="border-green padding_8">
        {label}
      </label>
      <div className="relative">
        <input
          type="time"
          id={labelFor}
          name={labelFor}
          value={val}
          onChange={onChangeHandler}
        />
        {errorCondition && <p className="error">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default TimePicker;
