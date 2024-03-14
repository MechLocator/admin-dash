import React, { useContext, useState } from "react";
import Layout from "../layout";
import "./edit-profile.css";
import { AuthContext } from "../../context/AuthContext";
import { Button, Input, Space } from "antd";
import { FaRegUserCircle, FaUserGraduate } from "react-icons/fa";
import { CiMail, CiPhone } from "react-icons/ci";
import axios from "axios";
import { useSnackbar } from "notistack";

const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.phoneNumber);
  const [jobRole, setJobRole] = useState(user.jobRole);
  const [userDesc, setUserDesc] = useState(user.desc);

  const { enqueueSnackbar } = useSnackbar();

  const url = "https://api.mechtraktech.com";

  async function handleProfileUpdate() {
    setIsLoading(true);
    await axios
      .put(
        `${url}/api/dashboard/users/update-user/${user._id}`,
        {
          name,
          email,
          phoneNumber: number,
          desc: userDesc,
          jobRole,
        },
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      )
      .then(() => {
        enqueueSnackbar("User updated successfully", { variant: "success" });
        setIsLoading(false);
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: "error" });
        setIsLoading(false);
      });
  }

  return (
    <Layout>
      <div className="editUserContainer">
        <p className="largeEditText">Edit User Profile</p>
        <div className="editPageContainer">
          {/* Container One */}
          <div className="leftEditContainer">
            {/* User Profile holder */}
            <div className="editProfileContainer">
              <div className="profileBgContainer" />
              <img
                src={
                  user.image
                    ? user.image
                    : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                }
                alt=""
                className="userEditProfile"
              />
              <div className="uploadImageContainer">
                <p className="largeProfileText">Your Photo</p>
                <p className="smallerProfileText">
                  This will be displayed on your profile
                </p>
                <Space
                  style={{
                    marginLeft: "35px",
                    marginTop: "10px",
                  }}
                >
                  <Button>Upload New</Button>
                  <Button type="primary" className="saveProfileImageBtn">
                    Save
                  </Button>
                </Space>
              </div>
            </div>
            <div className="personalUserInfoContainer">
              <p className="largeProfileInfoText">Personal Information</p>
              <div
                style={{
                  backgroundColor: "#f3f3f3",
                  margin: "12px 20px",
                  borderRadius: "12px",
                  padding: "16px 12px",
                }}
              >
                <div className="labelAndInputContainer">
                  <label
                    htmlFor="html"
                    style={{
                      fontSize: "0.85em",
                      marginLeft: "5px",
                      marginBottom: "4px",
                      color: "#7e7e7e",
                    }}
                    for="name"
                  >
                    Full Name
                  </label>
                  <div className="profileInputIconContainer">
                    <FaRegUserCircle size={14} />
                    <Input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="inputTextProfile"
                    />
                  </div>
                </div>
                <div className="labelAndInputContainer">
                  <label
                    htmlFor="html"
                    style={{
                      fontSize: "0.85em",
                      marginLeft: "5px",
                      marginBottom: "4px",
                      color: "#7e7e7e",
                    }}
                    for="email"
                  >
                    Email
                  </label>
                  <div className="profileInputIconContainer">
                    <CiMail size={14} />
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="inputTextProfile"
                    />
                  </div>
                </div>
                <div className="labelAndInputContainer">
                  <label
                    htmlFor="html"
                    style={{
                      fontSize: "0.85em",
                      marginLeft: "5px",
                      marginBottom: "4px",
                      color: "#7e7e7e",
                    }}
                    for="number"
                  >
                    Phone Number
                  </label>
                  <div className="profileInputIconContainer">
                    <CiPhone size={14} />
                    <Input
                      value={number}
                      onChange={e => setNumber(e.target.value)}
                      className="inputTextProfile"
                    />
                  </div>
                </div>
                <div className="labelAndInputContainer">
                  <label
                    htmlFor="html"
                    style={{
                      fontSize: "0.85em",
                      marginLeft: "5px",
                      marginBottom: "4px",
                      color: "#7e7e7e",
                    }}
                    for="role"
                  >
                    Job Role
                  </label>
                  <div className="profileInputIconContainer">
                    <FaUserGraduate size={14} />
                    <Input
                      value={jobRole}
                      onChange={e => setJobRole(e.target.value)}
                      className="inputTextProfile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Container Two */}
          <div className="rightEditContainer">
            {/* Bio Container  */}
            <div className="profileBioContainer">
              <p className="profileBioText">Bio</p>
              <div className="profileBioBody">
                <textarea
                  cols="30"
                  rows="6"
                  className="profileBio"
                  value={userDesc}
                  onChange={e => setUserDesc(e.target.value)}
                >
                  {user.desc}
                </textarea>
              </div>
            </div>
            <div className="submitBtnContainer">
              <Button
                type="primary"
                className="saveProfileImageBtn"
                style={{ width: "100%" }}
                loading={isLoading}
                disabled={isLoading}
                onClick={handleProfileUpdate}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
