import React from "react";
import Search from "./TeamSearchBar";
import AgeSelector from "./AgeSelector";

export default function Nav(props) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b-2 w-full bg-white justify-content-left">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold py-6 px-4">Team Search</h1>
          <div className="flex items-center px-2">
            <div>
              <AgeSelector setAge={props.setAge} />
            </div>
            <Search updateSearchQuery={props.updateSearchQuery} />
          </div>
        </div>
      </div>
    </header>
  );
}
