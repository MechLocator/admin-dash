import React, { useContext, useState } from "react";
import "./login.css";
import { Button, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiCkeditor4 } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import dayjs from "dayjs";

const authData = [
  {
    id: "0owueueue",
    type: "admin",
  },
  {
    id: "8ei9u",
    type: "editor",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authType, setAuthType] = useState({
    id: "0owueueue",
    type: "admin",
  });

  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const url = "https://api.mechtraktech.com";
  // const url = "https://api.mechtraktech.com";

  const currentDate = dayjs();

  const handleAdminLogin = async () => {
    if (!email && !password) return;
    setIsLoading(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${url}/api/dashboard/users/admin-login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
      localStorage.setItem("user", res.data);
      setEmail("");
      setPassword("");
      enqueueSnackbar("Login action successful", { variant: "success" });
      setIsLoading(false);

      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      enqueueSnackbar(error, { variant: "error" });
      setIsLoading(false);
    }
    // if (res.data.details) {
    // } else {
    //   dispatch({
    //     type: "LOGIN_FAILURE",
    //     payload: { message: "You are not allowed!" },
    //   });
    // }
  };

  const handleEditorLogin = async e => {
    if (!email && !password) return;
    setIsLoading(true);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${url}/api/dashboard/users/editor-login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
      localStorage.setItem("user", res);
      localStorage.setItem("token", res?.data?.token);
      setEmail("");
      setPassword("");
      enqueueSnackbar("Login action successful", { variant: "success" });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      enqueueSnackbar(error, { variant: "error" });
      setIsLoading(false);
    }
    // if (res.data.details) {
    // } else {
    //   dispatch({
    //     type: "LOGIN_FAILURE",
    //     payload: { message: "You are not allowed!" },
    //   });
    // }
  };

  return (
    <div className="loginParentContainer">
      <div className="leftContainer">
        <p className="containerDesc">Choose Your Role:</p>
        <div className="bottomLeftContainer">
          {authData.map((role, id) => (
            <div key={id}>
              <Button
                onClick={() => {
                  setAuthType(role);
                }}
              >
                {console.log(authType.type)}
                {role.type === "admin" ? (
                  <MdAdminPanelSettings size={20} color="#34bb78" />
                ) : role.type === "editor" ? (
                  <SiCkeditor4 size={20} color="#096fff" />
                ) : (
                  <FaCircleUser size={20} color="#f3f3f3" />
                )}
              </Button>
              <p
                className="role"
                style={{ color: role.type === "admin" ? "#34bb78" : "#096fff" }}
              >
                {role.type}
              </p>
            </div>
          ))}
        </div>
        <p className="containerFooterDesc">
          Mechanic Locator Technologies Ltd.
        </p>
        <p className="containerFooterDesc">
          &copy; {currentDate.format("YYYY")}
        </p>
      </div>
      <div className="rightContainer">
        {authType.type === "admin" ? (
          <div className="adminLayerContainer">
            <p className="desc">{authType.type?.toUpperCase()}</p>
            <div className="inputContainer">
              <Input
                className="textInput"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ borderRadius: "10px" }}
                placeholder={`${authType.type} email`}
              />
            </div>
            <div className="inputContainer">
              <Input
                className="textInput"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ borderRadius: "10px" }}
                placeholder={`${authType.type} password`}
              />
            </div>
            <div className="inputContainer flexContainer">
              <Button
                type="primary"
                className="submitBtn"
                loading={isLoading}
                onClick={handleAdminLogin}
              >
                <MdAdminPanelSettings size={16} color="#fff" />
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="editorLayerContainer">
            <p className="desc">{authType.type?.toUpperCase()}</p>
            <div className="inputContainer">
              <Input
                className="textInput"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ borderRadius: "10px" }}
                placeholder={`${authType.type} email`}
              />
            </div>
            <div className="inputContainer">
              <Input
                className="textInput"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ borderRadius: "10px" }}
                placeholder={`${authType.type} password`}
              />
            </div>
            <div className="inputContainer flexContainer">
              <Button
                type="primary"
                className="submitBtn"
                onClick={handleEditorLogin}
                loading={isLoading}
              >
                <SiCkeditor4 size={16} color="#fff" />
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
