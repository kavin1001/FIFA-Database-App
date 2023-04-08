import React, { useState, useEffect } from "react";
import axios from "axios";
import Courses from "./PlayerResults";
import Nav from "./Nav";
import Popup from "./PlayerCard";

export const AppContext = React.createContext(null);

export default function AppRoot() {
  // The courses state that will be updated with the API call
  const [courses, setCourses] = useState([]);

  // Show all courses
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sql/playerList")
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Route is not working"));
  }, []);

  // State variables to keep track of the app state globally
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [course, setCourse] = useState();
  const [year, setYear] = useState("2020");
  const [semester, setSemester] = useState("C");
  const [difficulty, setDifficulty] = useState(100);

  const selectedCourse = courses.find((c) => c.player_api_id === course);

  console.log("Course is: ", course)
  console.log("Selected course is: ", selectedCourse)
  // Functions to update the states

  // Removes a course from the cart
  function removeItemFromCart(id) {
    setCart(cart.filter((item) => item.number !== id));
  }

  // Adds a course to the cart
  function addItemToCart(id) {
    const newCourse = courses.find((c) => c.number === id);
    if (!cart.includes(newCourse)) {
      setCart([...cart, newCourse]);
    }
  }

  // Shows or hides the cart
  function showCart(state) {
    setOpenCart(state);
  }

  // Sets the course to the state
  function chooseCourse(course) {
    setCourse(course);
  }

  // Shows or hides the popup
  function showPopup(state) {
    setOpenPopup(state);
  }

  // Everytime the search query changes, this function will be called
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // Since the API needs A,B, or C instead of the actual semester
  function updateSemester(sem) {
    if (sem === "Spring") {
      setSemester("A");
    } else {
      setSemester("C");
    }
  }

  const appContextValue = {
    cart,
    courses,
    showCart,
    showPopup,
    chooseCourse,
    updateSearchQuery,
    searchQuery,
    removeItemFromCart,
    addItemToCart,
    openCart,
    openPopup,
    setCourse,
    selectedCourse,
    updateSemester,
    semester,
    year,
    setYear,
    setDifficulty,
    difficulty,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <Nav updateSearchQuery={setSearchQuery} />
      {/* <Cart courses={cart} /> */}
      <Courses searchString={searchQuery} />
      {selectedCourse && <Popup course={selectedCourse} />}
    </AppContext.Provider>
  );
}
