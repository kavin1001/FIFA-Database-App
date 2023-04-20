import React, { useState } from "react";

// The search bar component that is used in the nav bar
export default function Search(props) {
  const [searchString, setSearchString] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  // Function that updates the search query when the user types in the search bar

  function handleInput(event) {
    console.log(event.currentTarget.value);
    setSearchString(event.currentTarget.value);
  }

  function handleSearch(event) {
    console.log("Search value is: ", event.currentTarget.value);
    if (searchTrue) {
      props.updateSearchQuery("");
      setSearchTrue(false);
    } else {
      props.updateSearchQuery(searchString);
      setSearchTrue(true);
    }
  }

  return (
    <div className="py-6 px-2 flex">
      <div className="mr-2">
        <input
          className="w-36 md:w-96 p-2 rounded-full border-black border-2"
          type="text"
          id="search-bar"
          placeholder="Search for a player..."
          onChange={handleInput}
        />
      </div>
      {searchTrue ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleSearch}
        >
          Reset
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleSearch}
        >
          Search
        </button>
      )}
    </div>
  );
}
