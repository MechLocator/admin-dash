import React, { useState } from "react";
import "./accordion.css";
import { IoChevronDownCircle, IoChevronUpCircle } from "react-icons/io5";

const Accordion = ({ title, body, category }) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  return (
    <div className="accordionParentContainer">
      <div className="accordionContainer">
        <div className="titleToggleBtn">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "flex-start",
            }}
          >
            <p className="titleText">{title}</p>
            <p
              className="titleText"
              style={{
                backgroundColor: "#f3f3f3",
                color: "#7e7e7e",
                fontSize: "0.55rem",
                padding: "3px 8px",
                borderRadius: "8px",
              }}
            >
              Category: {category}
            </p>
          </div>
          <button
            className="chevronDown"
            onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
          >
            {isAccordionExpanded ? (
              <IoChevronUpCircle size={18} color="#0096ff" />
            ) : (
              <IoChevronDownCircle size={18} color="#0096ff" />
            )}
          </button>
        </div>
        {isAccordionExpanded ? (
          <div className="accordionBody">
            <p className="accordionAnswer">{body}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accordion;
