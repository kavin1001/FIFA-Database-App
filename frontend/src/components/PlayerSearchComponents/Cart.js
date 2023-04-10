import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React, { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AppContext } from "./AppRoot";
import CourseTile from "./Tile";

export default function Cart(courses) {
  const { openCart, showCart, cart } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to handle the checkout button using useNavigate
  function handleClick() {
    navigate("/checkout", { state: { cart } });
  }

  // The rendering for the cart
  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog className="relative z-10" onClose={showCart}>
        <Transition.Child
          // Defining the transition animation for the background
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                // Defining the transition time and locations for the cart
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="pt-24 text-lg font-medium text-gray-900">
                          Your Course Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => showCart(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {courses.map((course) => (
                              <li key={course.title} className="flex py-6">
                                <div className="ml-4 flex flex-1 flex-col">
                                  <CourseTile course={course} />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-center">
                        {courses.length === 0 && (
                          <p className="text-center text-lg font-bold">
                            Your cart is empty!
                          </p>
                        )}
                        {courses.length > 7 && (
                          <p className="text-center text-lg font-bold">
                            Too many courses in cart!
                          </p>
                        )}
                        {courses.length !== 0 && courses.length < 8 && (
                          <button
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            onClick={handleClick}
                          >
                            Checkout
                          </button>
                        )}
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => showCart(false)}
                        >
                          Continue Browsing
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
