import React from "react";
import Search from "./SearchBar";
import {
  Input,
  initTE,
} from "tw-elements";
initTE({ Input });

export default function Nav(props) {

  function handleTeamChange(evt) {
    props.setTeams(evt.target.value);
  }

  return (
    <header className="sticky top-0 z-50 w-full h-full">
      <div className="border-b-2 w-full bg-white justify-content-left">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold py-6 px-4">Player Search</h1>
          <div className="flex items-center px-2">
            {/* Number of teams input */}
            <div className="self-center relative h-18 w-64" data-te-input-wrapper-init>
              <input
                type="number"
                className="peer block min-h-full w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary"
                min={1}
                value={props.teams}
                placeholder='Minimum Teams Played For'
                style={{textAlign: 'center'}}
                onChange={handleTeamChange}
              />
            </div>
            <Search updateSearchQuery={props.updateSearchQuery} searchState={props.searchState}
        setSearchState={props.setSearchState} setTeams={props.setTeams}/>
          </div>
        </div>
      </div>
    </header>
  );
}
