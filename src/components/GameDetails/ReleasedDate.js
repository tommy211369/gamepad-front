// Librairies
import React from "react";

const ReleasedDate = ({ game }) => {
  // Variables :
  const date = game.released;
  const dateArray = date.split("-");
  const year = dateArray[0]; // 2018
  const month = dateArray[1]; // 10
  const day = dateArray[2]; // 26

  let newMonth = "";

  switch (month) {
    case "01":
      newMonth = "Jan";
      break;
    case "02":
      newMonth = "Feb";
      break;
    case "03":
      newMonth = "Mar";
      break;
    case "04":
      newMonth = "Apr";
      break;
    case "05":
      newMonth = "May";
      break;
    case "06":
      newMonth = "Jun";
      break;
    case "07":
      newMonth = "Jul";
      break;
    case "08":
      newMonth = "Aug";
      break;
    case "09":
      newMonth = "Sep";
      break;
    case "10":
      newMonth = "Oct";
      break;
    case "11":
      newMonth = "Nov";
      break;
    case "12":
      newMonth = "Dec";
      break;
    default:
      console.log("error Switch");
  }

  let newDate = `${newMonth} ${day}, ${year}`;

  return (
    <div>
      <p className="title">Released Date</p>
      <p>{newDate}</p>
    </div>
  );
};

export default ReleasedDate;
