import React, { useState } from "react";
import "./InteractiveProgressBar.css";

export const InteractiveProgressBar = ({ value, onChange }) => {
  return (
    <div className="progress-bar-container">
     <div className="slider-wrapper">
        <input
          type="range"
          min="0"
          max="1000"
          step="1"
          value={value}
          onChange={onChange}
          className="slider"
        />
      </div>
      <div className="input-values">
        <input
          type="string"
          value={`$${value}`}
          min="0"
          max="1000"
          onChange={onChange}
          className="input-field"
        />
        <span className="separator">-</span>
        <input
          type="number"
          value={1000 - value}
          readOnly
          className="input-field"
        />
      </div>
    </div>
  );
};
