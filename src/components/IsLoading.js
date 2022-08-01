import React from "react";
import "../styles/isLoading.css";

const IsLoading = () => {
  return (
    <div className="overlay">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default IsLoading;
