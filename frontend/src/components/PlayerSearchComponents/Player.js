import React, { useContext, useEffect, useState } from "react";
// import '../css/style.css'
import { AppContext } from "./AppRoot";

export default function Course(props) {
  // Passing in the course information
  const { dept, number, title, description } = props;

  const { addItemToCart, cart, showCart, showPopup, setCourse } =
    useContext(AppContext);
  const [inCart, setInCart] = useState(false);

  // Evertime the cart changes, updates which buttons to grey out
  // useEffect(() => {
  //     setInCart(cart.find((c) => c.number === number))
  // }, [cart])

  // Function to open the popup and show the course information
  function showCourseInfo() {
    setCourse(number);
    showPopup(true);
    console.log("showing course info");
    console.log(number);
    console.log(showPopup);
  }

  return (
    <div className="">
      <div className="shadow-sm hover:shadow-2xl rounded-xl border-2 p-5 w-full h-full">
        <div className="flex flex-col">
          <span className="font-bold text-slate-400">{number}</span>
          <button
            className="w-fit h-8 text-xs md:text-lg font-bold text-green-600 text-ellipsis overflow-hidden mb-6 hover:underline hover:text-green-700"
            onClick={showCourseInfo}
          >
            {title}
          </button>
        </div>
        <div className="h-24 text-ellipsis overflow-hidden ...">
          <p className="text-md italic h-fit">{description}</p>
        </div>
        {/* <div className='w-full mb-5 flex self-end justify-center items-center mt-3'>
                    <button className={inCart ? 'inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md cursor-not-allowed' : 'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'} 
                    onClick={()=>{
                        console.log('add to cart')
                        addItemToCart(number)
                        setInCart(true)
                        showCart(true);
                        console.log(cart)
                        // Timeout to change the color back to blue
                        setTimeout(() => {
                                showCart(false);
                            }, 2000);
                        }}>
                        {inCart ? 'In Cart' :' Add to Cart'}</button>
                </div> */}
      </div>
    </div>
  );
}
