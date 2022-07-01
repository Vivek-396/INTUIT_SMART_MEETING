const validateDate = (date, newDate, d) => {
  return (
    date != null &&
    !(
      (newDate.getUTCDate() >= d.getUTCDate() &&
        newDate.getUTCMonth() >= d.getUTCMonth() &&
        newDate.getUTCFullYear() >= d.getUTCFullYear()) ||
      (newDate.getUTCMonth() > d.getUTCMonth() &&
        newDate.getUTCFullYear() >= d.getUTCFullYear()) ||
      newDate.getUTCFullYear() > d.getUTCFullYear()
    )
  );
};

const checkIfToday = (newDate, d) => {
  return (
    newDate.getUTCDate() === d.getUTCDate() &&
    newDate.getUTCMonth() === d.getUTCMonth() &&
    newDate.getUTCFullYear() === d.getUTCFullYear()
  );
};

const getSuggestorValue = (allData) => {
  return [
    { name: "None", value: null },
    ...((!!allData && allData.Buildings) || []),
  ];
};

const validateStartTime = (isToday, startTime, d) => {
  return (
    !!startTime &&
    !(
      (isToday &&
        d.getHours() <= parseInt(startTime.split(":")[0]) &&
        d.getMinutes() < parseInt(startTime.split(":")[1])) ||
      !isToday
    )
  );
};

export { validateDate, checkIfToday, getSuggestorValue, validateStartTime };
