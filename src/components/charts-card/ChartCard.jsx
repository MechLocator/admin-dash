import React from "react";
import "./chart-card.css";
import { FaUser } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";
import { IoCloudDownload } from "react-icons/io5";
import { assignValue, simpleForm } from "../../utils/dummyMessages";
import { Skeleton } from "antd";

const ChartCard = ({ tally, type, loading }) => {
  return (
    <div className="parentContainer">
      <div className="topCardsContainer">
        <div className="individualCardIconContainer">
          {type === "Motorists" ? (
            <FaUser size={20} color="#fff" />
          ) : type === "Garages" ? (
            <PiGarageFill size={20} color="#fff" />
          ) : (
            <IoCloudDownload size={20} color="#fff" />
          )}
        </div>
        <div className="categCardTallyContainer">
          <p className="typeBlurText">{type}</p>
          {loading ? (
            <Skeleton.Button size="small" active style={{ width: "80px" }} />
          ) : (
            <p className="tallyCardBoldText">
              {simpleForm(tally)}
              {assignValue(tally)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
