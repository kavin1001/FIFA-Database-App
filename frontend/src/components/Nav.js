import { UserStore } from "../context/UserStore";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { setUserData, userData, logout, thirdPartySignOn, setThirdParty } = UserStore();
  const navigate = useNavigate();

  const submitLogout = async () => {
    console.log("logging out", thirdPartySignOn);
    if (thirdPartySignOn) {
      setThirdParty(false);
      setUserData(null);
      navigate("/login");
    } else {
      await logout(userData.username);
      navigate("/login");
    }
  };

  return (
    <nav class="flex items-center justify-between flex-wrap bg-custom-purple p-6">
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="/"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Home
          </a>
          <a
            href="/player-search"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Players
          </a>
          <a
            href="/team-search"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Teams
          </a>
          <a
            href="/matches"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Matches
          </a>
          <a
            href="/profile"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
          >
            Profile
          </a>
        </div>
        <div>
          <button
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-custom-purple hover:bg-white mt-4 lg:mt-0"
            onClick={submitLogout}
          >
            {" "}
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
