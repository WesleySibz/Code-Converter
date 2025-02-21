import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const CodeConverter = () => {
  
  const [code, setCode] = useState(""); // State to store the code

  const [output, setOutput] = useState(""); // State to store the output
  const [loading, setLoading] = useState(false); // State to track loading status

  const [fromLanguage, setFromLanguage] = useState("JavaScript"); // State to store the from language
  const [toLanguage, setToLanguage] = useState("JavaScript"); // State to store the to language

  const storedCodeRef = useRef("");  // Using useRef to store the previous code

  const isValidCode = (code, language) => {
    if (!code.trim()) return false; // Ensure the code is not empty
  
    switch (language) {
      case "JavaScript":
        return /\b(function|const|let|var|=>|console\.log|document\.)\b/.test(code);
      case "Python":
        return /\b(def|import|print\(|for |if |elif|else:|class |self)\b/.test(code);
      case "C#":
        return /\b(public|private|class |using |namespace |void |Console\.WriteLine)\b/.test(code);
      case "Java":
        return /\b(public|private|class |import |static void main|System\.out\.println)\b/.test(code);
      default:
        return false;
    }
  };

  // useEffect to track changes in the code state
  useEffect(() => {
    if (code === "Analysing code...") {
      setLoading(true);
    } else if (code === "Code analysis complete!") {
      setLoading(false);
    }
  }, [code]);

  // Function to simulate code analysis
  const handleReadCode = () => {
    const wasNotEmpty = !!code.trim(); // Check if text is present

    // Check if the code is empty
    if (wasNotEmpty) {
      storedCodeRef.current = code; // Store code in useRef (this won't cause a re-render)
    }

    if (!wasNotEmpty) {
      storedCodeRef.current = "No code to analyse!";
      setCode("No code to analyse!");
      return;
    }
    
    // Check if the code matches the selected language
    if (!isValidCode(code, fromLanguage)) {
      storedCodeRef.current = "Error: Code does not match the selected language!";
      setCode("Error: Code does not match the selected language!");
      return;
    }

    setCode("Analysing code..."); // Set loading text

    //loading animation
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setCode("Analysing code" + ".".repeat(count));
    }, 500);

    // Simulate analysis time (3 seconds)
    setTimeout(() => {
      clearInterval(interval);
      setCode("Code analysis complete!");

      // Restore original text after 1 second
      setTimeout(() => {
        setCode(storedCodeRef.current); // Use the value from useRef
        setOutput(""); // Clear output after analysis
      }, 1000);
    }, 3000);
  };

  const handleConvertCode = () => {
    setOutput(`Converting from ${fromLanguage} to ${toLanguage}...`);
  };

  const handleInputClick = () => {
    setCode(""); // Clears input area when clicked
  };

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="title-1">CODE</h1>
        <h1 className="title-2">Converter</h1>
      </div>

      <div className="main-container">
        <div className="input-controls">
          <button onClick={handleReadCode}>Read</button>
          <select className="from" value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
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
          <button onClick={handleConvertCode}>Convert</button>
        </div>
      </div>

      <div className="input-output-container">
        <div className="editor">
          <textarea
            className="input-area"
            placeholder="Enter your code here..."
            value={code}
            onClick={handleInputClick}
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
