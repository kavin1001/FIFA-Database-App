// eslint-disable-next-line
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../context/UserStore";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth0 } from "@auth0/auth0-react";
import FacebookLogin  from '@greatsumini/react-facebook-login';
import LoginButton from "../components/auth0";
import axios from "axios";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ userGoogle, setUserGoogle ] = useState([]);
  const [auth0user, setAuth0User] = useState([]);
  const navigate = useNavigate();

  const appId = '148909804818213';

  const errorMessage = (error) => {
      console.log(error);
  };

  const {userData, login, setUserData, setThirdParty} = UserStore();
  const { user, logout, isAuthenticated, isLoading, error } = useAuth0();


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
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

// useEffect(() => {
//     setUserData(user);
//     console.log("User from auth0", user);
// }, [ user ]);

useEffect(() => {
  console.log("Error is: ", error);
  if (isLoading) {
    console.log("loading");
}
  else if (!isAuthenticated) {
      console.log("authenticated: ", isAuthenticated);
  }
  else if (!isLoading && isAuthenticated) {
      const { name, picture, email } = user;
      console.log("User from auth0", user);
      setUserData(user)
  }
}, [isAuthenticated, user]);


  useEffect(
    () => {
        if (userGoogle) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${userGoogle.access_token}`,
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
    [ userGoogle ]
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
        <LoginButton />
        <button class="w-64 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" onClick={() => signInWithGoogle()}>Sign in with Google</button> 
      </div>
    </div>
  );
}

export default Login;
