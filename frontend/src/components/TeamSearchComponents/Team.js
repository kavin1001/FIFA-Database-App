import React, { useContext } from "react";
import { AppContext } from "./TeamRoot";

export default function Team(props) {
  // Passing in the team information
  const {number, title} = props;

  const {showPopup, setTeam } =
    useContext(AppContext);

  // Function to open the popup and show the player information
  function showTeamInfo() {
    setTeam(number);
    showPopup(true);
    console.log("showing team info");
    console.log(number);
    console.log(showPopup);
  }

  return (
    <div className="">
      <div className="shadow-sm hover:shadow-2xl rounded-full border-2 p-5 w-full h-fit">
        <div className="flex flex-col items-center" onClick={showTeamInfo}>
          <span className="font-bold text-slate-400">{number}</span>
          <div
            className="w-fit h-8 text-xs md:text-lg font-bold text-green-600 text-ellipsis overflow-hidden hover:text-green-700"
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
