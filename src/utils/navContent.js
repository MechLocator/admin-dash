import { GoHomeFill } from "react-icons/go";
import { IoPieChart } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";
import { ImDownload } from "react-icons/im";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

import "./iconStyle.css";

export const navContent = [
  {
    id: 12323,
    name: "Home",
    link: "/",
    icon: <GoHomeFill size={35} className="iconStyle" />,
  },
  {
    id: 143,
    name: "Charts",
    link: "/charts",
    icon: <IoPieChart size={35} className="iconStyle" />,
  },
  {
    id: 4567,
    name: "Users",
    link: "/users",
    icon: <FaUsers size={35} className="iconStyle" />,
  },
  {
    id: 0o323,
    name: "FAQs",
    link: "/faq",
    icon: <BsQuestionDiamondFill size={35} className="iconStyle" />,
  },
  {
    id: 123453,
    name: "Settings",
    link: "/settings",
    icon: <IoSettingsOutline size={35} className="iconStyle" />,
  },
];
