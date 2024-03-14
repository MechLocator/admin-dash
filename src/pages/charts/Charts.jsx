import React, { useContext, useEffect, useState } from "react";
import "./charts.css";
import Layout from "../../components/layout";
import DownloadsChart from "../../components/charts-downloads/DownloadsChart";
import Registrations from "../../components/charts-registration/Registrations";
import Realtime from "../../components/charts-realtime/Realtime";
import ChartCard from "../../components/charts-card/ChartCard";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Charts = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const url = "https://api.mechtraktech.com";

  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function fetchAllUsers() {
    setIsLoading(true);
    await axios
      .get(`${url}/api/dashboard/users/get-users`, {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
      })
      .then(res => {
        setAllUsers(res.data);
        console.log("Users: " + JSON.stringify(res.data));
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }
  const garages = allUsers.filter(user => user.accountType === "Garage");
  const users = allUsers.filter(
    user => user.accountType === "Driver" || user.accountType === "Motorist"
  );
  console.log("Your garages are: " + JSON.stringify(garages));
  return (
    <Layout>
      <div className="chartsContainer">
        {/* First container */}
        <div className="topContainer">
          {/* LineChart for downloads */}
          <DownloadsChart />
          {/* User Registration comparison dognhurt chart */}
          <Registrations />
        </div>
        {/* Show Cards with charts */}
        <div className="cardChartsContainer">
          <ChartCard
            type={"Motorists"}
            tally={users.length}
            loading={isLoading}
          />
          <ChartCard
            type={"Garages"}
            tally={garages.length}
            loading={isLoading}
          />
          <ChartCard type={"Downloads"} tally={100000} loading={isLoading} />
        </div>
        {/* Show realtime server performance chart */}
        <Realtime />
      </div>
    </Layout>
  );
};

export default Charts;
