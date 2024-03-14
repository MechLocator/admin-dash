import React, { useContext, useState } from "react";
import "./settings.css";
import Layout from "../../components/layout";
import {
  CiCalendar,
  CiCircleQuestion,
  CiFileOn,
  CiLocationOn,
  CiLock,
  CiMail,
  CiPhone,
  CiTextAlignCenter,
  CiUnlock,
  CiUser,
} from "react-icons/ci";
import { Button, Radio, Space, Spin } from "antd";
import { SiWebauthn } from "react-icons/si";
import { ImCopy } from "react-icons/im";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useSnackbar } from "notistack";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";

const Settings = () => {
  const [password, setPassword] = useState("************");
  const [showPassword, setShowPassword] = useState(false);
  const [whenLoading, setWhenLoading] = useState(false);
  // const whenLoading = true;
  const [cloudinaryUrl, setCloudinaryUrl] = useState(undefined);

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [jobLocation, setJobLocation] = useState(undefined);
  const [jobRole, setJobRole] = useState(undefined);
  const [desc, setDesc] = useState(undefined);
  const [role, setRole] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const userData = {
    name,
    email,
    password,
    phoneNumber,
    role,
    jobLocation,
    desc,
    jobRole,
    image: cloudinaryUrl?.secure_url,
  };

  const [image, setImage] = useState({});
  const [optionPicked, setOptionPicked] = useState("admin");
  const { enqueueSnackbar } = useSnackbar();
  const genPass = () => {
    // Create a random password
    const randomPassword = Math.random().toString(16).slice(2);

    // Set the generated password as state
    setPassword(randomPassword);
  };
  const copyToClipboard = async text => {
    try {
      if (password === "************") return;
      await navigator.clipboard.writeText(text);
      enqueueSnackbar("Password copied successfully", { variant: "info" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Sorry. Password wasn't successfully copied!", {
        variant: "error",
      });
    }
  };

  const url = "https://api.mechtraktech.com";

  const { user } = useContext(AuthContext);
  console.log("LoggedIn User: " + JSON.stringify(user));

  const token = user.token;

  // const handleChange = e => {
  //   setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  // Handle image upload to cloudinary
  const handleUserCreation = async imageFile => {
    setWhenLoading(true);
    console.log(userData);
    try {
      // Profile image upload handling
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "rxujpqnl");
      data.append("cloud_name", "dkyhvp5ae");
      data.append("api_key", process.env.CLOUDINARY_API_KEY);
      await axios
        .post(`https://api.cloudinary.com/v1_1/dkyhvp5ae/image/upload`, {
          body: data,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => res.json())
        .then(result => {
          console.log(`Result from cloudinary ${result}`);
          setCloudinaryUrl(result);
        })
        .catch(error =>
          console.log(
            "Error while uploading profile image to Cloudinary " + error
          )
        );
      // User creation with cloudinaryUrl operation
      try {
        const res = await axios.post(
          `${url}/api/dashboard/users/create-dash-user`,
          {
            ...userData,
          },
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        console.log(`New user is: ${JSON.stringify(res.data)}`);
        console.log(`Token: ${token}`);
        enqueueSnackbar("User creation successful!", { variant: "success" });
        setWhenLoading(false);
        setName("");
        setPhoneNumber("");
        setJobLocation("");
        setDesc("");
        setJobRole("");
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        setWhenLoading(false);
        console.log(error);
      }
    } catch (error) {
      enqueueSnackbar("Operation failed! Please try again", {
        variant: "error",
      });
    }
  };

  const sendPassToEmail = async () => {
    // If we have no password or email or role, leave the whole execution
    if (
      password === "************" ||
      email === undefined ||
      role === undefined
    )
      return;
    setIsLoading(true);
    await axios
      .post(
        `${url}/api/dashboard/users/send`,
        {
          email,
          role,
          password,
        },
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      )
      .then(() => {
        enqueueSnackbar("Email successfully sent!", { variant: "success" });
        setEmailSent(true);
        setIsLoading(false);
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: "error" });
        setEmailSent(false);
        setIsLoading(false);
      });
  };
  return (
    <Layout>
      <div className="settingsPageContainer">
        {user.role === "admin" && (
          <div className="createAdminUserContainer">
            <div className="usernameInput">
              <CiUser size={22} color="#808080" />
              <input
                required={true}
                type="text"
                className="username"
                value={name}
                placeholder="User's full name..."
                disabled={whenLoading}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="usernameInput">
              <CiMail size={22} color="#808080" />
              <input
                required={true}
                type="email"
                value={email}
                className="username"
                placeholder="User's email..."
                disabled={whenLoading}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="usernameInput">
              <CiPhone size={22} color="#808080" />
              <input
                required={true}
                type="tel"
                value={phoneNumber}
                className="username"
                placeholder="User's phone number..."
                disabled={whenLoading}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="usernameInput">
              <CiLocationOn size={22} color="#808080" />
              <input
                required={true}
                type="text"
                value={jobLocation}
                className="username"
                placeholder="City,Country..."
                disabled={whenLoading}
                onChange={e => setJobLocation(e.target.value)}
              />
            </div>
            <div className="usernameInput">
              <CiTextAlignCenter size={22} color="#808080" />
              <input
                required={true}
                type="text"
                value={jobRole}
                className="username"
                placeholder="Job role..."
                disabled={whenLoading}
                onChange={e => setJobRole(e.target.value)}
              />
            </div>
            <div className="usernameInput" style={{ paddingLeft: "35px" }}>
              <textarea
                className="userDesc"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f3f3f3",
                }}
                cols="80"
                rows="6"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Brief user description..."
              />
            </div>
            <div className="usernameInput">
              <CiLock size={22} color="#808080" />
              <input
                type={showPassword ? "text" : "password"}
                className="username"
                value={password}
                placeholder={password}
                disabled={whenLoading}
                // onChange={handleChange}
              />
              {showPassword ? (
                <IoEyeOutline
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                  size={20}
                  color="#808080"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={e => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                  size={20}
                  color="#808080"
                />
              )}
            </div>
            <div className="usernameInput genPassHover">
              <SiWebauthn size={22} color="#808080" />
              <Button
                disabled={whenLoading}
                className="autoGenPassTrigger"
                onClick={genPass}
              >
                Auto-Generate Password
              </Button>
              <span className="randomPasGened">{password}</span>
              <span className="showOnHover">
                <CiCircleQuestion size={18} color="#0096ff" />
              </span>
              <span className="showExplanationOnHover">
                Assign the auto-generated password to the new dashboard user
                you're creating. They are to use this as their password during
                their initial sign-in to the dashboard but can later choose to
                change it.
              </span>
              <ImCopy
                onClick={() => copyToClipboard(password)}
                size={18}
                className="copyIcon"
                color="#808080"
              />
            </div>
            <div className="usernameInput">
              <CiUnlock size={22} color="#808080" />
              <div className="radioBtnsContainer">
                <Radio.Group
                  onChange={e => {
                    console.log("radio checked", e.target.value);
                    setOptionPicked(e.target.value);
                  }}
                  disabled={whenLoading}
                  value={optionPicked}
                >
                  <Radio
                    value="admin"
                    onChange={e => {
                      setRole(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    Admin
                  </Radio>
                  <Radio
                    value="editor"
                    onChange={e => {
                      setRole(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    Editor
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="usernameInput">
              <CiFileOn size={22} color="#808080" />
              <input
                type="file"
                className="file"
                accept="image/*"
                disabled={whenLoading}
                // value={image}
                onChange={event => {
                  if (event.target.files && event.target.files[0]) {
                    let reader = new FileReader();
                    reader.onload = e => {
                      setImage(e.target.result);
                    };
                    reader.readAsDataURL(event.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="usernameInput">
              {image ? (
                <img
                  src={image}
                  alt="user_profile"
                  className="userProfilePic"
                />
              ) : null}
            </div>
            <div className="usernameInput">
              <Button
                disabled={whenLoading}
                loading={whenLoading}
                onClick={handleUserCreation}
                className="submitBtn"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        <div
          className="editProfileContainer"
          style={{
            width: user.role !== "admin" ? "40%" : null,
          }}
        >
          <div className="bgImageContainer" />
          <img
            src={
              user.image
                ? user.image
                : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            }
            alt=""
            className="userProfile"
          />
          <div className="userBioDetailsContainer">
            <h3 className="userProfileName">{user.name}</h3>
            {user.jobRole && (
              <h5 className="userAuthRole">
                {user.jobRole} | Mechanic Locator Technologies Ltd.
              </h5>
            )}
            {user.jobLocation && (
              <p className="userLocationInfo">{user.jobLocation}</p>
            )}
            {user.desc && <p className="userBriefDescription">{user.desc}</p>}
            <div className="iconUsernameContainer">
              <CiMail size={20} color="#808080" />
              <p className="settingsEmail">{user.email}</p>
            </div>
            <div className="iconUsernameContainer">
              <CiPhone size={20} color="#808080" />
              <p className="settingsEmail">{user.phoneNumber}</p>
            </div>
            <div className="userJoinDateContainer">
              <CiCalendar size={20} color="#808080" />
              <p className="joinDate">
                Joined on {dayjs(user.createdAt).format("MMM DD, YYYY - HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {user.role === "admin" && (
        <div className="emailEditorContent">
          {!emailSent ? (
            <>
              <div className="labelSenderEmailContainer">
                <p className="smallText">From:</p>
                <p className="senderEmail">mechaniclocator@gmail.com</p>
              </div>
              <div className="labelSenderEmailContainer">
                <p className="smallText">To:</p>
                <p className="senderEmail">{email}</p>
              </div>
              <div className="emailBodyContainer">
                <p className="emailBody">
                  The newly created user ought to use this password
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "#3f45b1",
                      textDecoration: "underline",
                      margin: "0px 4px",
                    }}
                  >
                    {password}
                  </span>
                  to log in to the dashboard. Their role is
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "#3f45b1",
                      textDecoration: "underline",
                      margin: "0px 4px",
                    }}
                  >
                    {role}
                  </span>
                  and they should use this when they are signing in.
                </p>
              </div>
              <Button
                type="primary"
                disabled={isLoading || (!email && !password && !role)}
                loading={isLoading}
                onClick={sendPassToEmail}
                className="submitEmailBtn"
              >
                <CiMail size={16} color="#f3f3f3" />
                Send Email
              </Button>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                src="https://img.freepik.com/free-vector/paper-airplane-send-with-dotted-lines-flat-style_78370-2884.jpg?size=626&ext=jpg&ga=GA1.1.202138819.1694380386&semt=ais"
                alt="email-sent-picture"
                style={{
                  width: "20%",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  color: "#000",
                  fontWeight: "normal",
                }}
              >
                Email sent to new admin board user!!
              </p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Settings;
