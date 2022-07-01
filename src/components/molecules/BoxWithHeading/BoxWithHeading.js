import React from "react";

const BoxWithHeading = ({
  wrapperClass = "",
  text1 = "",
  text2 = "",
  heading = "",
}) => {
  return (
    <div className={wrapperClass}>
      <p className="font-size_16">{heading}</p>
      <p>{text1}</p>
      <p>{text2}</p>
    </div>
  );
};

export default BoxWithHeading;
