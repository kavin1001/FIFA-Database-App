import React from "react";
import Nav from "../components/Nav";
import { UserStore } from "../context/UserStore";

function Profile() {
    const { userData } = UserStore();
    if (userData) {
        return (
            <div>
            <Nav/>
            <div class="w-full max-w-lg mx-auto mt-12">
            <p className="text-3xl text-center font-bold mb-6">Your Profile Page</p>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <p>{userData.first}</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                </label>
                <p>{userData.last}</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                    Username
                </label>
                <p>{userData.username}</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Email
                </label>
                <p>{userData.email}</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Birthday
                </label>
                <p>{userData.birth}</p>
                </div>
            </div>
            </div>
            </div>
        );
    } else {
        <div>
            <h1 className="font-bold text-center">Not logged in</h1>
        </div>
    }
}

export default Profile;