import React, { useState } from "react";
import { navContent } from "../../utils/navContent";
import TopBar from "../top-bar/TopBar";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSidebarExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          width: `${isExpanded ? "auto" : "60px"}`,
          height: "100vh",
          marginTop: "0",
          paddingTop: "55px",
          marginLeft: "0px",
          backgroundColor: "#fff",
          transitionDuration: "3s",
        }}
      >
        {/* <div
          style={{
            paddingTop: "50px",
            paddingBottom: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="./logo192.png"
            width={40}
            height={40}
            style={{ transitionDuration: "2s", position: "sticky" }}
            alt="logo"
          />
        </div> */}
        <button
          onClick={handleSidebarExpand}
          style={{
            position: "absolute",
            top: "25px",
            width: "auto",
            left: 50,
            backgroundColor: `${isExpanded ? "#f3f3f3" : "#fff"}`,
            paddingLeft: 3,
            paddingRight: 3,
            paddingTop: 2,
            paddingBottom: 1,
            borderRadius: "50%",
            outline: "none",
            border: `${isExpanded ? "1px solid #f3f3f3" : "1px solid #ffff"}`,
          }}
        >
          {isExpanded ? (
            <FaCircleChevronLeft
              style={{
                cursor: "pointer",
                position: "absolute",
                transitionDuration: "2s",
                left: 65,
              }}
              size={18}
              color="#0096FF"
            />
          ) : (
            <FaCircleChevronRight
              style={{ cursor: "pointer", transitionDuration: "2s" }}
              size={16}
              color="#0096FF"
            />
          )}
        </button>
        {navContent.map(item => (
          <a
            href={item.link}
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              justifyContent: "flex-start",
              marginTop: "25px",
            }}
          >
            <p
              style={{
                cursor: "pointer",
                transitionDuration: "2s",
                paddingLeft: `${isExpanded ? "24px" : "14px"}`,
              }}
              className="navItem"
            >
              {item.icon}
            </p>
            {isExpanded ? (
              <p
                style={{
                  color: "#72A0C1",
                  //   fontFamily: "sans-serif",
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontSize: 12,
                  opacity: `${isExpanded ? 1 : 0}`,
                  fontFamily: "Roboto, sans-serif",
                  transitionDelay: `${item.id + 3}00ms`,
                }}
              >
                {item.name}
              </p>
            ) : null}
          </a>
        ))}
      </div>
      {/* Main Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingLeft: `${isExpanded ? "160px" : "80px"}`,
          backgroundColor: "#f3f3f3",
          fontFamily: "Roboto, sans-serif",
          transitionDuration: "2s",
          transitionDelay: "",
        }}
      >
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
