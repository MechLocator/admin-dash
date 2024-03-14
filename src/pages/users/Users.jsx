import React, { useContext, useEffect, useState } from "react";
import "./users.css";
import Layout from "../../components/layout";
import { Card, Button, Skeleton, Input } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { user } = useContext(AuthContext);

  const pageOptions = [
    {
      id: "kdieijgirh",
      title: "5",
    },
    {
      id: "kdieijgir",
      title: "10",
    },
    {
      id: "039jdisfd",
      title: "15",
    },
    {
      id: "9034rksn",
      title: "20",
    },
  ];

  const [serverData, setServerData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    handleDataFetch();
  }, [itemsPerPage, page]);
  const url = "https://api.mechtraktech.com";

  const handleDataFetch = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${url}/api/dashboard/users/get-all-users?page=${page}&pageSize=${itemsPerPage}`,
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      )
      .then(res => {
        setServerData(Object.values(res.data.result));
        setPageCount(res.data.pageCount);
        setTotalUsers(res.data.totalUsers);
        console.log(typeof res.data.result);
        // console.log(JSON.stringify(Object.values(res.data.result)));
        // console.log(
        //   "Type of Server Data: " + typeof Object.values(res.data.result)
        // );
        setIsLoading(false);
      })
      .catch(error => console.log(`Error on users fetch ${error.message}`));
  };

  function fetchPrevBatch() {
    setPage(p => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function fetchNextBatch() {
    setPage(p => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  return (
    <Layout>
      <div className="usersTableContainer">
        <div
          style={{
            width: "95%",
            margin: "15px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Input
            allowClear
            placeholder="search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              border: "1px solid #f3f3f3",
              marginBottom: "20px",
              width: "25%",
              borderRadius: "10px",
            }}
          />
          {searchTerm === "" && (
            <div
              className="pagination-options-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {isLoading ? (
                <Skeleton.Button active style={{ width: "100px" }} />
              ) : (
                <span
                  id="disable"
                  style={{ fontSize: ".85rem", color: "#c5c5c5" }}
                >
                  Showing {serverData.length} of {totalUsers} users
                </span>
              )}
              <Button disabled={page === 1} onClick={fetchPrevBatch}>
                Prev
              </Button>
              <Button disabled={page === pageCount} onClick={fetchNextBatch}>
                Next
              </Button>
              <select
                className="diabled-select"
                placeholder={`${itemsPerPage} users per page`}
                value={itemsPerPage}
                onChange={e => setItemsPerPage(e.target.value)}
              >
                {pageOptions.map(option => (
                  <option
                    key={option.id}
                    value={option.title}
                    style={{ backgroundColor: "#f3f3f3" }}
                  >
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <Select
              placeholder="Sort By:"
              allowClear
              style={{ border: "1px solid #fff" }}
              options={sortOptions.map(option => ({ value: option.title }))}
              onChange={handleSelectChange}
            />
          </div> */}
        </div>
        {isLoading ? (
          <Card
            style={{
              width: "95%",
              margin: "15px auto",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5 style={{ fontSize: "2rem", textTransform: "capitalize" }}>
              Your data is loading...
            </h5>
          </Card>
        ) : (
          <Card style={{ width: "95%", margin: "15px auto" }}>
            <table className="usersTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Account Type</th>
                  <th>Created At</th>
                  <th>Verified</th>
                  <th>Suspended</th>
                </tr>
              </thead>
              <tbody className="usersData">
                {serverData?.map(data => (
                  <tr
                    key={data._id}
                    style={{ width: "100%", cursor: "pointer" }}
                    onClick={() => navigate(`/users/${data?._id}`)}
                  >
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.accountType}</td>
                    <td>
                      {dayjs(data.createdAt).format(
                        "dddd MMM DD, YYYY - HH:mm"
                      )}
                    </td>
                    {data.isVerified ? (
                      <td>
                        <p
                          style={{
                            border: "1px solid rgba(218, 247, 166, .4)",
                            backgroundColor: "rgba(218, 247, 166, .4)",
                            borderRadius: "8px",
                            padding: "2px 4px",
                            textAlign: "center",
                          }}
                        >
                          Verified
                        </p>
                      </td>
                    ) : (
                      <td>
                        <p
                          style={{
                            border: "1px solid rgba(252, 191, 191, .3)",
                            backgroundColor: "rgba(252, 191, 191, .3)",
                            borderRadius: "8px",
                            padding: "2px 4px",
                            textAlign: "center",
                          }}
                        >
                          Not Verified
                        </p>
                      </td>
                    )}
                    {data.isSuspended ? (
                      <td>
                        <p
                          style={{
                            border: "1px solid rgba(252, 191, 191, .3)",
                            backgroundColor: "rgba(252, 191, 191, .3)",
                            borderRadius: "8px",
                            padding: "2px 4px",
                            textAlign: "center",
                          }}
                        >
                          Suspended
                        </p>
                      </td>
                    ) : (
                      <td>
                        <p
                          style={{
                            border: "1px solid rgba(218, 247, 166, .4)",
                            backgroundColor: "rgba(218, 247, 166, .4)",
                            borderRadius: "8px",
                            padding: "2px 4px",
                            textAlign: "center",
                          }}
                        >
                          Not Suspended
                        </p>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        <div
          style={{
            display: "flex",
            width: "95%",
            margin: "15px auto",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "15px",
          }}
        >
          {/* <Pagination
            defaultCurrent={1}
            total={serverData.length}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            showSizeChanger
          /> */}
          {searchTerm === "" && (
            <div
              className="pagination-options-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {isLoading ? (
                <Skeleton.Button active style={{ width: "100px" }} />
              ) : (
                <span
                  id="disable"
                  style={{ fontSize: ".85rem", color: "#c5c5c5" }}
                >
                  Showing {serverData.length} of {totalUsers} users
                </span>
              )}
              {isLoading ? (
                <Skeleton.Button active style={{ width: "100px" }} />
              ) : (
                <Button disabled={page === 1} onClick={fetchPrevBatch}>
                  Prev
                </Button>
              )}
              {isLoading ? (
                <Skeleton.Button active style={{ width: "100px" }} />
              ) : (
                <Button disabled={page === pageCount} onClick={fetchNextBatch}>
                  Next
                </Button>
              )}
              {isLoading ? (
                <Skeleton.Button active style={{ width: "100px" }} />
              ) : (
                <select
                  className="diabled-select"
                  placeholder={`${itemsPerPage} users per page`}
                  value={itemsPerPage}
                  onChange={e => setItemsPerPage(e.target.value)}
                  style={{ cursor: "pointer" }}
                >
                  {pageOptions.map(option => (
                    <option key={option.id} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
