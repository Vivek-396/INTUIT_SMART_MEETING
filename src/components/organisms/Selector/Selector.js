import React from "react";

const Selector = ({
  labelFor = "",
  label = "",
  value = null,
  onChangeHandler = () => {},
  selectorArr = [],
}) => {
  const val = !!value ? value : "";
  return (
    <div className="flex space-between margin-top_16">
      <label htmlFor={labelFor} className="border-green padding_8">
        {label}
      </label>
      <select id={labelFor} value={val} onChange={onChangeHandler}>
        {selectorArr.map((item, index) => (
          <option value={item.name || ""} key={`options_${index + 1}`}>
            {item.name || ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
