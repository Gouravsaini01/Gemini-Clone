import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
}; 
    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }
 
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    setRecentPrompt(input);
    setPrevPrompt((prev) => [...prev, input]);
    const responsearray = response.split("**");
    let newresponse = "";
    for (let i = 0; i < responsearray.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newresponse += responsearray[i];
      } else {
        newresponse += "<b>" + responsearray[i] + "</b>";
      }
    }
    const newresponse2 = newresponse.split("*").join("<br>");
    let newresponseArray = newresponse2.split(" ");
    for (let i = 0; i < newresponseArray.length; i++) {
      const nextWord = newresponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextvalue = {
    prevPrompt,
    setRecentPrompt,
    onSent,
    setResultData,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    input,
    resultData,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
