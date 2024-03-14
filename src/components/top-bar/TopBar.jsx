import React, { useContext, useState } from "react";

import "./top-bar.css";
import { RxAvatar } from "react-icons/rx";
import { dummyMessages } from "../../utils/dummyMessages";
import { FaUserCircle } from "react-icons/fa";

import { ClockCircleOutlined } from "@ant-design/icons";
import { IoSettingsOutline } from "react-icons/io5";

import { BsChatLeftText } from "react-icons/bs";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Divider } from "antd";

const TopBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  // const isImage = true;
  const isUnread = true;

  const url = "https://api.mechtraktech.com/api/dashboard/users";

  const { user, dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleMessagelistOpen = () => {
    if (isAvatarOpen) setIsAvatarOpen(false);
    setIsOpen(!isOpen);
  };

  const onLogout = async () => {
    setLoading(true);
    dispatch({ type: "LOGOUT" }); // for the frontend logout
    try {
      const userToken = localStorage.getItem("token");
      if (userToken !== null) {
        const res = await axios.get(`${url}/sign-out`, {
          // for the backend logout
          headers: {
            Authorization: `JWT ${userToken}`,
          },
        });
        if (res.data.success) {
          localStorage.removeItem("token");
          console.log("Successfully Logged out");
          setLoading(false);
          navigate("/login");
        }
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      console.log("Error on logout " + error);
    }
  };

  const handleAvatarOpen = () => {
    if (isOpen) setIsOpen(false);
    setIsAvatarOpen(!isAvatarOpen);
  };

  // const notifLength = dummyMessages.length;

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div
      style={{
        width: "98%",
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: "auto",
        height: "auto",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginTop: "20px",
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <input
        disabled
        type="text"
        name="search-query"
        placeholder="users, downloads..."
        className="searchInput"
      />
      <div
        style={{
          display: "flex",
          width: "auto",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* {isUnread ? (
          <div>
            <VscBell
              size={35}
              color="#0096FF"
              onClick={handleMessagelistOpen}
              style={{ paddingRight: "16px", cursor: "pointer" }}
            />
            <span className="toggleIndicator" />
          </div>
        ) : (
          <VscBell
            size={35}
            color="#0096FF"
            onClick={handleMessagelistOpen}
            style={{ paddingRight: "16px", cursor: "pointer" }}
          />
        )}

        {isOpen && (
          <div className="messageListContainer">
            {dummyMessages.map(message => (
              <div key={message.id} className="messageContainer">
                <img src={message.image} className="avatarHolder" />
                <div className="rightContainer">
                  <p className="name">{message.name}</p>
                  <p className="info">{message.message}</p>
                  <div className="timeContainer">
                    <ClockCircleOutlined size={14} />
                    <p className="actualTime">{message.timeline}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="viewMoreTrigger">
              <p>View More...</p>
            </div>
          </div>
        )} */}

        <IoSettingsOutline
          onClick={() => navigate("/settings")}
          size={35}
          color="#0096FF"
          style={{ paddingRight: "16px", cursor: "pointer" }}
        />

        {user?.image ? (
          <img
            src={user.image}
            alt="user_profile"
            className="userAvatarImage"
            onClick={handleAvatarOpen}
          />
        ) : (
          <RxAvatar
            size={35}
            onClick={handleAvatarOpen}
            color="#0096FF"
            style={{ paddingRight: "16px", cursor: "pointer" }}
          />
        )}
        {isAvatarOpen && (
          <div className="userDetailsContainer">
            <p className="profileName">{user.name}</p>
            <p className="profileEmail">{user.email}</p>
            <Divider />
            <div className="iconTitleContainer" onClick={navigateToProfile}>
              <FaUserCircle size={14} color="#808080" />
              <p className="title">Profile</p>
            </div>
            {/* <div className="iconTitleContainer">
              <BsChatLeftText size={14} color="#808080" />
              <p className="title">Messages</p>
            </div> */}
            {/* <div className="iconTitleContainer">
              <TbHelpHexagonFilled size={14} color="#808080" />
              <p className="title">Help</p>
            </div> */}
            <div
              className="iconTitleContainer"
              onClick={() => navigate("/settings")}
            >
              <MdOutlineSettings size={14} color="#808080" />
              <p className="title">Settings</p>
            </div>
            <div className="iconTitleContainer" onClick={onLogout}>
              <RiLogoutCircleRLine size={14} color="#808080" />
              <p className="title">Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
