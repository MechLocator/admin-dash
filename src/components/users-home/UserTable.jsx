import React, { useContext, useEffect, useState } from "react";
import "./table.css";
import { Table } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const UserTable = () => {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      filters: [
        {
          text: "Garage",
          value: "Garage",
        },
        {
          text: "Motorist",
          value: "Motorist",
        },
        {
          text: "Driver",
          value: "Driver",
        },
      ],
      onFilter: (value, record) => record?.accountType?.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      key: "accountType",
    },
    {
      title: "Mobile Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
    },
    {
      title: "Suspended",
      dataIndex: "isSuspended",
      key: "isSuspended",
    },
  ];
  return (
    <div className="tableContainer">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={allUsers}
        pagination={4}
      />
    </div>
  );
};

export default UserTable;
