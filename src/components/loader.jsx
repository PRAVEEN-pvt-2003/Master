import React from "react";
import "../Styles/loader.css";

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
