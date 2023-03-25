import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../context/UserStore";



function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");


    const {login} = UserStore();

    const navigate = useNavigate();

    const submitSignup = async () => {
        if (firstName === "" || lastName === "" || username === "" || password === "" || email === "" || birthday === "") {
            alert("Must Fill Out All Fields");
            return;
        }
        
        
        try {
            const body = {
                username: username,
                password: password,
                email: email,
                first: firstName,
                last: lastName,
                birth: birthday,
            }
            // const res = await axios.post("http://localhost:8080/api/user/create", body);
            // if (res.status === 200) {
            //   await login(username, password);
            //   navigate("/");
            // }
            
      
          } catch (e) {
            if (e.response.status === 409) {
                alert("Username Exists");
                return;
            }
          }
    }

    return (
        <form class="w-full max-w-lg mx-auto mt-12">
        <p className="text-3xl text-center font-bold mb-6">Create an account</p>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                Username
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="username" placeholder="johndoe" value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Email
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Birthday
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="date" placeholder="90210" value={birthday} onChange={e => setBirthday(e.target.value)}/>
            </div>
        </div>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" type="button" onClick={submitSignup}>
            Sign Up
          </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
            Already have an account? Click here to login!
          </a>
        </form>
    );
  }
  
  export default Signup;