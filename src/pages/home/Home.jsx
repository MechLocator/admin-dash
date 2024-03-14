import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Layout from "../../components/layout";
import Card from "../../components/card/Card";
import Chart from "../../components/home-downloads-chart/Chart";
import PieChart from "../../components/pie/Pie";
import ServerActivity from "../../components/server-home/ServerActivity";
import UserTable from "../../components/users-home/UserTable";
import Profile from "../../components/home-user/Profile";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
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
      <div className="cardsContainer">
        <Card
          type={"Motorists"}
          change={2.45}
          tally={users.length}
          loading={isLoading}
        />
        <Card
          type={"Garages"}
          change={54}
          tally={garages.length}
          loading={isLoading}
        />
        <Card
          type={"Downloads"}
          change={12.45}
          tally={100000}
          loading={isLoading}
        />
      </div>
      <div className="chartFaqContainer">
        <Chart />
        <PieChart />
      </div>
      <div className="serverChartContainer">
        <ServerActivity />
        <Profile />
      </div>
      <UserTable />
    </Layout>
  );
};

export default Home;
