// eslint-disable-next-line
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../context/UserStore";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {userData, login} = UserStore();

  const submitLogin = async () => {
    if (username === "") {
      alert("Missing username");
      return
    }
    if (password === "") {
      alert("Missing password")
      return
    }
    await login(username, password);
    if (userData) {
      navigate("/");
    }
  }

  return (
    <div class="w-full max-w-xs items-center mx-auto mt-12">
    <p className="text-3xl text-center font-bold">Login</p>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={submitLogin}>
            Log In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/signup">
            Don't have an account?
          </a>
        </div>
      </form>

    </div>
  );
}

export default Login;
