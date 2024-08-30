import React from "react";
import "./Loader.css";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="wrapper">
      <div className="loader">
        <ColorRing />
      </div>
    </div>
  );
};

export default Loader;
