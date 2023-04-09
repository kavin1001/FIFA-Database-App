import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { AppContext } from "./AppRoot";
import InfoTable from "./PlayerInfoTable";

export default function Popup(props) {
  const { openPopup, showPopup, addItemToCart, showCart, cart } =
    useContext(AppContext);

  const cancelButtonRef = useRef(null);

  const [inCart, setInCart] = useState(false);

  const navigate = useNavigate();

  // Function to add the course to the cart from the popup
  function addToCart() {
    showPopup(false);
    addItemToCart(props.course.number);
    setInCart(true);
    showCart(true);
    setTimeout(() => {
      showCart(false);
    }, 2500);
  }

  function redirectPlayerPage() {
    console.log(
      "Redirect Link is: ",
      `/player/${props.course.player_api_id}`
    );
    navigate(`/player/${props.course.player_api_id}`);
  }

  // The use effect to update the buttons when the cart changes from the popup
  // useEffect(() => {
  //     setInCart(cart.find((c) => c.number === course.number))
  // }, [cart, course.number])

  return (
    <Transition.Root show={openPopup} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={showPopup}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <InfoTable course={props.course} />
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => showPopup(false)}
                  >
                    Back to Results
                  </button>
                  <button
                    type="button"
                    className={
                      inCart
                        ? "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md cursor-not-allowed"
                        : "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    }
                    onClick={redirectPlayerPage()}
                    ref={cancelButtonRef}
                  >
                    More Info
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
