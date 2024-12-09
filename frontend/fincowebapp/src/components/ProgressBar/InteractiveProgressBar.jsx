import React, { useState } from "react";
import "./InteractiveProgressBar.css";

export const InteractiveProgressBar = () => {
  const [value, setValue] = useState(0); 

  const handleChange = (e) => {
    setValue(Number(e.target.value)); 
  };

  return (
    <div className="progress-bar-container">
     <div className="slider-wrapper">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={handleChange}
          className="slider"
        />
      </div>
      <div className="input-values">
        <input
          type="number"
          value={value}
          min="0"
          max="100"
          onChange={(e) => setValue(Number(e.target.value))}
          className="input-field"
        />
        <span className="separator">-</span>
        <input
          type="number"
          value={100 - value}
          readOnly
          className="input-field"
        />
      </div>
    </div>
  );
};
