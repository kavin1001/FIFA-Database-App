import React, { useContext, useEffect } from "react";
import { AppContext } from "./TeamRoot";
import Team from "./Team";
import axios from "axios";

export default function Teams(props) {
  // Redifining the type of searchString from object to string
  if (typeof searchString === "object") {
    props.searchString = "";
  }

  const { teams } = useContext(AppContext);

  // Displayed teams is updated based on the search string such that the conditions are met
  let displayedTeams = teams.filter(
    (c) =>
      c.team_long_name.toLowerCase().indexOf(props.searchString.toLowerCase()) !==
      -1
  );

  return (
    <div>
      <div className="mx-auto mb-12 h-full w-5/6 items-center justify-between">
        <div className="mt-6 grid gap-4 grid-cols-3">
          {displayedTeams.map((c) => (
            <Team
              key={c.id}
              number={c.team_api_id}
              title={c.team_long_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
