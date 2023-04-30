import React, { useContext } from "react";
import { AppContext } from "./TeamRoot";
import Team from "./Team";

export default function Courses(props) {
  // Redifining the type of searchString from object to string
  if (typeof searchString === "object") {
    props.searchString = "";
  }

  // The global difficulty state that is set in the DifficultyFilter component
  const { teams } = useContext(AppContext);

  // Displayed courses is updated based on the search string such that the conditions are met
  const displayedTeams = teams.filter(
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
