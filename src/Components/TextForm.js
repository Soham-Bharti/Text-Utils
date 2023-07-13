import React, { useState } from "react";

export default function (props) {
  const [text, setText] = useState("");
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    // console.log('Write here...')
    props.showAlert("Converted to Uppercase!", "success");
  };
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!", "success");
  };
  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared!", "success");
  };
  // let localstorage = localStorage;
  const handleOnChange = (event) => {
    setText(event.target.value);
    // localstorage.setItem(1, text);
  };
  const handleSpeakClick = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Speaking invoked!", "success");
  };

  const handleCapClick = () => {
    let newText = () => {
      let finalStrArr = [];
      let strArr = text.split(" ");
      strArr.forEach((element) => {
        finalStrArr.push(element.charAt(0).toUpperCase() + element.slice(1));
      });
      let finalStr = finalStrArr.join(" ");
      return finalStr;
    };
    setText(newText);
    props.showAlert("Each word capitalised!", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text); 
    props.showAlert("Copied to clipboard!", "success");
  };
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };
  return (
    <>
       <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
        <h1 className="mb-4">
          {props.heading}
        </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#042743",
              color: props.mode === "light" ? "black" : "white",
            }}
          ></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button disabled={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button disabled={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleSpeakClick}>
          Speak
        </button>
        <button disabled={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleCapClick}>
          Capitalise
        </button>
        <button disabled={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>
          Remove extra spaces
        </button>
        <button disabled={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>
          Clear Text
        </button>
      </div>
      <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary...</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>
        </div>
    </>
  );
}
