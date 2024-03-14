import React, { useContext, useEffect, useState } from "react";
import "./faq.css";
import Layout from "../../components/layout";
import Accordion from "../../components/faq-accordion/Accordion";
import { FaPlus } from "react-icons/fa";
import { Button, Select } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

const Faq = () => {
  const [modalOpen, setModalOpen] = useState(false); // for the button trigger
  const [option, setOption] = useState("general");
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const url = "https://api.mechtraktech.com";
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    await axios
      .get(`${url}/api/dashboard/users/get-faqs`, {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
      })
      .then(res => {
        setFaqs(res.data);
        console.log(JSON.stringify(res.data));
      })
      .catch(error => error);
  }

  async function createFaq() {
    await axios
      .post(
        `${url}/api/dashboard/actions/create`,
        {
          body: answer,
          category: option,
          title: question,
          isApproved: false,
        },
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      )
      .then(() => {
        setQuestion("");
        setAnswer("");
      })
      .then(() => {
        enqueueSnackbar("FAQ created successfully", { variant: "success" });
        setModalOpen(false);
      })
      .catch(error => enqueueSnackbar(error, { variant: "error" }));
  }

  return (
    <Layout>
      <div className="faqsContainer">
        <p className="pageTitleText">FAQs</p>
        <div className="triggerBtnContainer">
          <button className="toggleBtn" onClick={() => setModalOpen(true)}>
            <FaPlus size={16} className="plusIcon" />
            <p className="btnText">Add FAQ</p>
          </button>
        </div>
        {modalOpen ? (
          <div className="addFaqContainer">
            <div className="modalTitleToggleBtnContainer">
              <p className="modalTitleText">Add FAQ</p>
              {/* <Button
                danger
                className="cancelBtn"
                onClick={() => setModalOpen(false)}
              >
                <RxCross1 size={16} color="#ff0000" />
              </Button> */}
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="question"
                id="question"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Question"
                className="questionInput"
              />
            </div>
            <div className="textAreaContainer">
              <textarea
                name="anser"
                id="anser"
                cols="60"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows="6"
                placeholder="Your Answer"
                className="faqAnswer"
              ></textarea>
            </div>
            <div className="selectCategContainer">
              <select
                name="category"
                id="category"
                dir="right"
                placeholder="Select the appropriate category"
                className="selectCategOption"
                onChange={e => {
                  setOption(e.target.value);
                  console.log("Selected option " + e.target.value);
                }}
              >
                <option value="general" className="categOption">
                  General
                </option>
                <option value="privacy" className="categOption">
                  Privacy
                </option>
                <option value="security" className="categOption">
                  Security
                </option>
                <option value="troubleshooting" className="categOption">
                  Troubleshooting
                </option>
              </select>
            </div>
            <div className="controlBtnContainer">
              <Button danger onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createFaq} className="saveCreationBtn">
                Save
              </Button>
            </div>
          </div>
        ) : null}
        {faqs.map(faq => (
          <Accordion
            key={faq._id}
            title={faq.title}
            body={faq.body}
            category={faq.category}
          />
        ))}
        {/* <Accordion
          title={"Who was Nelson Mandela?"}
          body={
            "He was the first African president of South Africa, after colonialism. He was also arrested by the British and release in 1992."
          }
        /> */}
      </div>
    </Layout>
  );
};

export default Faq;
