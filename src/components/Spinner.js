// Librairies
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "50px auto",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ color: "#FF4655" }} />
    </div>
  );
};

export default Spinner;
