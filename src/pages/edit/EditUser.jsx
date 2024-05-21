import React, { useContext, useEffect, useState } from "react";
import "./edit.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";

import Layout from "../../components/layout";
import { Button, Popconfirm, Skeleton, Tooltip, message } from "antd";
import { MdLocalPhone, MdVerified } from "react-icons/md";
import { PiGarageFill } from "react-icons/pi";
import { IoCarSportSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { ImLocation } from "react-icons/im";
import { FaUser } from "react-icons/fa";

const EditUser = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const url = "https://api.mechtraktech.com/api/dashboard";
  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const fetchSingleUser = async () => {
    setIsLoading(true);
    await axios
      .get(`${url}/users/get-user/${id}`, {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
      })
      .then(result => {
        setUserData(result.data);
        console.log("Fetched user " + JSON.stringify(userData));
        setIsLoading(false);
      })
      .catch(error => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        setIsLoading(false);
      });
  };

  async function handleUserVerification() {
    setIsLoading(true);
    await axios
      .put(
        `${url}/users/modify-status/${id}`,
        {
          isVerified: true,
        },
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      )
      .then(res => console.log(JSON.stringify(res)))
      .then(() => {
        enqueueSnackbar("User verified successfully", { variant: "success" });
        setIsLoading(false);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" });
        setIsLoading(false);
      });
  }
  async function handleUserSuspension() {
    setIsLoading(true);
    await axios
      .put(
        `${url}/modify-status/${id}`,
        {
          isSuspended: true,
        },
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      )
      .then(res => console.log(JSON.stringify(res)))
      .then(() => {
        enqueueSnackbar("This user has been suspended", { variant: "success" });
        setIsLoading(false);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" });
        setIsLoading(false);
      });
  }
  const usernameArr = Object.assign([], userData.name);
  const nameToShow =
    usernameArr.length <= 9 ? usernameArr.slice(0, 8) : usernameArr.slice(0, 7);
  const cancel = e => {
    console.log(e);
    message.error("This operation has been aborted!");
  };
  return (
    <Layout>
      <div className="editAppUserContainer">
        <div className="topContainer">
          <div className="leftImageContainer" style={{ position: "relative" }}>
            <div className="bgImageHolderContainer" />
            <img
              src={
                user?.image
                  ? user.image
                  : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
              }
              alt="bio-profile-image"
              className="styleImage"
            />
            <div className="ctaBtnsContainer">
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px" }}
                />
              ) : userData?.accountType === "Garage" ? (
                <Popconfirm
                  title="User verfication"
                  description="Are you sure to verify this user?"
                  onConfirm={handleUserVerification}
                  onCancel={cancel}
                  cancelButtonProps={{
                    danger: true,
                  }}
                  okButtonProps={{
                    loading: isLoading,
                    type: "default",
                  }}
                  okText="Verify"
                  cancelText="Cancel"
                >
                  <Button
                    disabled={isLoading || userData.isVerified === true}
                    loading={isLoading}
                    style={{
                      backgroundColor: userData.isVerified
                        ? "#c5c5c5"
                        : "#0096ff",
                      color: "#fff",
                    }}
                  >
                    {userData.isVerified ? "Verified" : "Verify"}
                  </Button>
                </Popconfirm>
              ) : (
                ""
              )}
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px" }}
                />
              ) : (
                <Popconfirm
                  title="User suspension"
                  description="Are you sure to suspend this user?"
                  onConfirm={handleUserSuspension}
                  cancelButtonProps={{
                    danger: true,
                  }}
                  okButtonProps={{
                    loading: isLoading,
                    type: "default",
                  }}
                  onCancel={cancel}
                  okText="Suspend"
                  cancelText="Cancel"
                >
                  <Button disabled={isLoading} loading={isLoading}>
                    {userData.isSuspended ? "Suspended" : "Suspend"}
                  </Button>
                </Popconfirm>
              )}
            </div>
            {isLoading ? (
              <Skeleton.Button
                active
                size="small"
                style={{ width: "100px", marginLeft: "20px" }}
              />
            ) : (
              <>
                <Tooltip
                  title={userData.name}
                  placement="topLeft"
                  color="#0096ff"
                >
                  <p
                    className="largerTextName"
                    style={{
                      maxWidth: "22.5%",
                      textTransform: "capitalize",
                    }}
                  >
                    {nameToShow}
                  </p>
                </Tooltip>
              </>
            )}
            {userData.isVerified === true ? (
              <span
                style={{
                  position: "absolute",
                  top: "200px",
                  right: usernameArr.length <= 9 ? "630px" : "620px",
                }}
              >
                <MdVerified color="#0096ff" size={20} />
              </span>
            ) : null}
            <div>
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{
                    width: "100px",
                    marginLeft: "20px",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <p
                  className="lightGreyText"
                  style={{
                    backgroundColor: "#daf7a6",
                    marginBottom: "20px",
                    padding: "2px 5px",
                    borderRadius: "8px",
                    color: "#c5c5c5",
                    width: "fit-content",
                  }}
                >
                  {userData.accountType}
                </p>
              )}
            </div>
          </div>
          <div className="rightBioContainer">
            <div className="iconAndDescContainer">
              <FaUser size={18} color="#c5c5c5" />
              <p
                className="slightlyLargeText"
                style={{ textTransform: "capitalize" }}
              >
                {userData.name}
              </p>
            </div>
            <div className="iconAndDescContainer">
              {userData.accountType === "Garage" ? (
                <PiGarageFill size={18} color="#c5c5c5" />
              ) : (
                <IoCarSportSharp size={18} color="#c5c5c5" />
              )}
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px", margin: "6px" }}
                />
              ) : (
                <p
                  className="slightlyLargeText"
                  style={{ textTransform: "capitalize" }}
                >
                  {userData.accountType}
                </p>
              )}
            </div>
            <div className="iconAndDescContainer">
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px", margin: "6px" }}
                />
              ) : (
                <IoIosMail size={18} color="#c5c5c5" />
              )}
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px", margin: "6px" }}
                />
              ) : (
                <p className="slightlyLargeText">{userData.email}</p>
              )}
            </div>
            <div className="iconAndDescContainer">
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px", margin: "6px" }}
                />
              ) : (
                <MdLocalPhone size={18} color="#c5c5c5" />
              )}
              {isLoading ? (
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "100px", margin: "6px" }}
                />
              ) : (
                <p className="slightlyLargeText">{userData.phoneNumber}</p>
              )}
            </div>
            {isLoading ? (
              <Skeleton.Button
                active
                size="small"
                style={{ width: "100px", margin: "6px" }}
              />
            ) : (
              <>
                {userData.accountType === "Garage" ? (
                  <div className="iconAndDescContainer">
                    <ImLocation size={18} color="#c5c5c5" />
                    <p className="slightlyLargeText">{userData.location}</p>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
