import React, { useState } from "react";
import codesData from "./data/codes.json";

import "./index.css";

const languageOptions = [
  { value: "", label: "All" },
  { value: "1", label: "Python" },
  { value: "2", label: "C" },
  { value: "3", label: "C++" },
  // Add more language options here
];

const operationOptions = [
  { value: "", label: "All" },
  { value: "1", label: "Input taker" },
  { value: "2", label: "Searching" },
  { value: "3", label: "Adding" },
  { value: "4", label: "Sorting" },
  { value: "5", label: "All" },
];

const timeComplexityOptions = [
  { value: "", label: "All" },
  { value: "1", label: "O(1)" },
  { value: "2", label: "O(n^2)" },
  { value: "3", label: "O(n)" },
  // Add more time complexity options here
];

const spaceComplexityOptions = [
  { value: "", label: "All" },
  { value: "1", label: "O(1)" },
  { value: "2", label: "O(n^2)" },
  { value: "3", label: "O(n)" },
  // Add more space complexity options here
];

// function generateUniqueId(
//   language,
//   operation,
//   timeComplexity,
//   spaceComplexity,
//   codeNumber
// ) {
//   return `${language}${operation}${timeComplexity}${spaceComplexity}${codeNumber
//     .toString()
//     .padStart(3, "0")}`;
// }

function filterCodes(
  codes,
  language,
  operation,
  timeComplexity,
  spaceComplexity
) {
  return codes.filter((code) => {
    const matchesLanguage = language === "" || code.id[0] === language;
    const matchesOperation = operation === "" || code.id[1] === operation;
    const matchesTimeComplexity =
      timeComplexity === "" || code.id[2] === timeComplexity;
    const matchesSpaceComplexity =
      spaceComplexity === "" || code.id[3] === spaceComplexity;

    return (
      matchesLanguage &&
      matchesOperation &&
      matchesTimeComplexity &&
      matchesSpaceComplexity
    );
  });
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [operation, setOperation] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [codes, setCodes] = useState(codesData.codes);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    const filteredCodes = filterCodes(
      codesData.codes,
      language,
      operation,
      timeComplexity,
      spaceComplexity
    ).filter((code) =>
      code.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
    setCodes(filteredCodes);
  };

  const handleCopy = (code) => {
    const codeWithNewLine = code.replace(/\\n/g, "\n");

    const textarea = document.createElement("textarea");
    textarea.value = codeWithNewLine;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    console.log("Code copied to clipboard with new line!");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    const filteredCodes = filterCodes(
      codesData.codes,
      e.target.value,
      operation,
      timeComplexity,
      spaceComplexity
    ).filter((code) =>
      code.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
    setCodes(filteredCodes);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    const filteredCodes = filterCodes(
      codesData.codes,
      language,
      e.target.value,
      timeComplexity,
      spaceComplexity
    ).filter((code) =>
      code.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
    setCodes(filteredCodes);
  };

  const handleTimeComplexityChange = (e) => {
    setTimeComplexity(e.target.value);
    const filteredCodes = filterCodes(
      codesData.codes,
      language,
      operation,
      e.target.value,
      spaceComplexity
    ).filter((code) =>
      code.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
    setCodes(filteredCodes);
  };

  const handleSpaceComplexityChange = (e) => {
    setSpaceComplexity(e.target.value);
    const filteredCodes = filterCodes(
      codesData.codes,
      language,
      operation,
      timeComplexity,
      e.target.value
    ).filter((code) =>
      code.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
    setCodes(filteredCodes);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">V-Code Template</div>
        </div>
        <div className="navbar-right">
          <div className="navbar-dropdown">
            <button className="navbar-dropdown-toggle">Versions</button>
            <ul className="navbar-dropdown-menu">
              <li>
                <a href="/">v1.0.0</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
      <div className="search-form">
        <label>Language: </label>
        <select value={language} onChange={handleLanguageChange}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>Operation: </label>
        <select value={operation} onChange={handleOperationChange}>
          {operationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>Time Complexity: </label>
        <select value={timeComplexity} onChange={handleTimeComplexityChange}>
          {timeComplexityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>Space Complexity: </label>
        <select value={spaceComplexity} onChange={handleSpaceComplexityChange}>
          {spaceComplexityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Search by tags..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <hr />
      <h3>Search results:</h3>
      <div className="code-container">
        {codes.length > 0 ? (
          codes.map((code) => (
            <div key={code.id} className="code-card">
              <button onClick={() => handleCopy(code.code)}>Copy</button>
              <p>Contributor: {code.contributor}</p>
              <pre>{code.code}</pre>
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>

      <hr />
      <footer className="footer">
        <div className="footer-left">
          <span className="version">V-Code Template: v1.0.0</span>
        </div>
        <div className="footer-center">
          <div className="footer-content">
            <p>
              This website was created by K Vivek Kumar as a part of
              V-Utilities.
            </p>
            <ul>
              <li>Recommendations for website usage:</li>
              <li>
                1. The searching is done dynamically, so there isn't any
                requirement of a search button or "enter" key to search.
              </li>
              <li>
                2. If the page opens up to "No results found," please try again
                later. This may occur due to temporary server management issues.
              </li>
              <li>
                3. If you encounter any bugs or have concerns regarding the
                security of the website, please contact us by emailing
                <a href="#">xyz@xyz.xyz</a>.
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <a href="https://example.com" className="utilities-button">
            V-Utilities
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
