import React, { useState } from "react";
import "./App.css";

const CodeConverter = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [fromLanguage, setFromLanguage] = useState("JavaScript");
  const [toLanguage, setToLanguage] = useState("JavaScript");

  const handleReadCode = () => {
    // Logic to analyze code (Placeholder for now)
    setOutput(`Analyzing code...`);
  };

  const handleFromConvertCode = () => {
    // Logic to convert code (Placeholder for now)
    setOutput(`Converting code to ${fromLanguage}...`);

  };

  const handleToConvertCode = () => {
    // Logic to convert code (Placeholder for now)
    setOutput(`Converting code to ${toLanguage}...`);
    
  };

  return (
    <div className="container">

      <div className="header-container">
        <h1 className = "title-1">CODE</h1>
        <h1 className= "title-2">Converter</h1>
      </div>

      <div className="main-container">
        
        <div className="input-controls">
            <button onClick={handleReadCode}>Read</button>

            <select className = "from" value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C#">C#</option>
              <option value="Java">Java</option>
            </select>
        </div>
  
        <div className="output-controls">
            <select className="to" value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C#">C#</option>
              <option value="Java">Java</option>
            </select>

            <button onClick={() => { handleFromConvertCode(); handleToConvertCode(); }}>Convert</button>
        </div>
      </div>

      <div className="input-output-container">

              <div className="editor">
                <textarea
                  className="input-area"
                  placeholder="Enter your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
              </div>

              <div className="output">
              <textarea className="output-area" value={output} readOnly></textarea>
              </div>

      </div>

    </div>
  );
};

export default CodeConverter;