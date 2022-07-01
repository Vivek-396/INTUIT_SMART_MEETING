import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Homepage from "./components/pages/Homepage";
import Loader from "./components/atoms/Loader";

import "./App.css";

const MeetingPage = React.lazy(() => import("./components/pages/MeetingPage"));
const RoomsListing = React.lazy(() =>
  import("./components/pages/RoomsListing")
);

const routeConfig = {
  rooms: "/rooms",
  meetings: "/meetings",
  home: "/",
};

function App() {
  const [allData, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const config = { headers: { token: "a123gjhgjsdf6576" } };
  const url = "http://smart-meeting.herokuapp.com/";

  useEffect(() => {
    const data = {
      query:
        "{Buildings {name, meetingRooms {name, id, floor, meetings { title, date, startTime, endTime }}}, MeetingRooms {name, floor, building {name}, meetings {title, date, startTime, endTime}}, Meetings {title,  title, date, startTime, endTime}}",
    };

    axios
      .post(url, data, config)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const props = { isLoading: isLoading, isError: isError, allData: allData };
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={routeConfig.rooms}
            exact
            element={<RoomsListing allData={allData} />}
          />
          <Route
            path={routeConfig.meetings}
            exact
            element={<MeetingPage allData={allData} />}
          />
          <Route path={routeConfig.home} element={<Homepage {...props} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
