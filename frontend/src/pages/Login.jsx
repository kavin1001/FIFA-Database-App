// eslint-disable-next-line
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../context/UserStore";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ user, setUser ] = useState([]);
  const navigate = useNavigate();

  const errorMessage = (error) => {
      console.log(error);
  };

  const {userData, login, setUserData, setThirdParty} = UserStore();

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

  const signInWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setThirdParty(true)
                    setUserData(res.data);
                    console.log("User from gmail signon", res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);


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
      <div className="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => signInWithGoogle()}>Sign in with Google 🚀 </button>    
      </div>
    </div>
  );
}

export default Login;
