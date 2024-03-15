import React, { useContext } from "react";
import "./profile.css";
import { BsBellFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const url = "https://api.mechtraktech.com";
  const { enqueueSnackbar } = useSnackbar();

  const onLogout = async () => {
    dispatch({ type: "LOGOUT" }); // for the frontend logout
    try {
      const userToken = localStorage.getItem("token");
      if (userToken !== null) {
        const res = await axios.get(`${url}/api/dashboard/users/sign-out`, {
          // for the backend logout
          headers: {
            Authorization: `JWT ${userToken}`,
          },
        });
        if (res.data.success) {
          localStorage.removeItem("token");
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
  return (
    <div className="profileContainer">
      <div className="userImageContainer">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
          alt="user_profile"
          className="userImage"
        />
        <div className="userProfileContainer">
          <div className="nameEmailContainer">
            <h4 className="userName">{user.name}</h4>
            <p className="userEmail">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="recentActivityContainer">
        <p className="largeText">Recent Activity</p>
        <div className="iconTextContainer">
          <BsBellFill size={18} color="#808080" />
          <p className="smallerText">Notifications</p>
        </div>
        <div className="iconTextContainer">
          <IoSettings size={18} color="#808080" />
          <p className="smallerText">Settings</p>
        </div>
        <div className="iconTextContainer" onClick={onLogout}>
          <RiLogoutCircleRLine size={18} color="#808080" />
          <p className="smallerText">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
