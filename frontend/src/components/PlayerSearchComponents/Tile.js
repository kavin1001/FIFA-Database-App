import React, { useContext } from "react";
import { AppContext } from "./AppRoot";

export default function CourseTile(course) {
  // Tile that we see in the cart
  const { removeItemFromCart } = useContext(AppContext);
  const { title, number, dept } = course;

  return (
    <div className="text-sm">
      <h2>{dept + " " + number}</h2>
      <h1 className="font-bold text-xl mb-2">{title}</h1>
      <button
        className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => removeItemFromCart(number)}
      >
        Remove Course
      </button>
    </div>
  );
}
