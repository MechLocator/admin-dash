import React from "react";
import "./card.css";
import { FaUser } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";
import { IoCloudDownload } from "react-icons/io5";
import { assignValue, simpleForm } from "../../utils/dummyMessages";
import { Skeleton } from "antd";

const Card = ({ type, change, tally, loading }) => {
  const prevChange = 20;
  return (
    <div className="cardContainer">
      <div className="iconContainer">
        {type === "Motorists" ? (
          <FaUser size={20} color="#fff" />
        ) : type === "Garages" ? (
          <PiGarageFill size={20} color="#fff" />
        ) : (
          <IoCloudDownload size={20} color="#fff" />
        )}
      </div>
      <div className="tallyContainer">
        <p className="textLarge">{type}</p>
        <div className="tallyChangeContainer">
          {loading ? (
            <Skeleton.Button size="small" active style={{ width: "150px" }} />
          ) : (
            <p className="tallyText">
              {simpleForm(tally)}
              {assignValue(tally)}
            </p>
          )}
          <span
            className="changeSpanIndicator"
            style={{
              color: change > prevChange ? "green" : "#ff0000",
              backgroundColor: change > prevChange ? "#DAF7A6" : "#F4DFDF",
            }}
          >
            {change > prevChange ? "+" : "-"}
            {change}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
