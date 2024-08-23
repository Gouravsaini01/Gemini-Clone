import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets/assets";
import { Context } from "../../context/context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  console.log("in main ", resultData);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon}></img>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello dev...</span>
              </p>
              <p>How can i help you today</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon}></img>
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon}></img>
              </div>
              <div className="card">
                <p>Brainstrom team bonding activitiesfor our work retreat</p>
                <img src={assets.message_icon}></img>
              </div>
              <div className="card">
                <p>Improve the readiability of the following code</p>
                <img src={assets.code_icon}></img>
              </div>
            </div>
            <p className="bottom-info">Gemini may display inaccurate information</p>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon}></img>
              <p style={{ color: "white" }}> {recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon}></img>
              {loading ? (
                <>
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                </>
              ) : (
                <p
                  style={{ color: "white" }}
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text "
              placeholder="enter a prompt here"
            ></input>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            {input ? (
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
