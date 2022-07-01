const checkIsOnGoing = (
  currentHour,
  currentMin,
  startTime = "00:00",
  endTime = "00:00"
) => {
  const startHour = startTime.split(":")[0];
  const startMin = startTime.split(":")[1];

  const endHour = endTime.split(":")[0];
  const endMin = endTime.split(":")[1];

  if (
    currentHour >= startHour &&
    currentMin >= startMin &&
    currentHour <= endHour &&
    currentMin <= endMin
  ) {
    return 1;
  }
  return 0;
};

const getMeetingsToday = (allData, d) => {
  let currentlyOnGoingMeeting = 0;
  const meetingsToday =
    ((!!allData && allData.Meetings) || []).filter((item) => {
      if (
        item &&
        item.date &&
        (!!item.date.split("/")[0] || !!item.date.split("-")[0]) &&
        parseInt(item.date.split("/")[0] || item.date.split("-")[2]) ===
          d.getDate() &&
        (d.getMonth() + 1 === parseInt(item.date.split("/")[1]) ||
          d.getMonth() + 1 === parseInt(item.date.split("-")[1])) &&
        (d.getFullYear() === parseInt(item.date.split("/")[2]) ||
          d.getFullYear() === parseInt(item.date.split("-")[0]))
      ) {
        // NOTE :: counting currently ongoing
        currentlyOnGoingMeeting =
          currentlyOnGoingMeeting +
          checkIsOnGoing(
            d.getHours(),
            d.getMinutes(),
            item.startDate,
            item.enddate
          );
        return true;
      }
      return false;
    }) || 0;

  return { meetingsToday, currentlyOnGoingMeeting };
};

export { checkIsOnGoing, getMeetingsToday };
