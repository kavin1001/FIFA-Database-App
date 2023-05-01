import React from "react";
import Nav from "../components/Nav";
import Loading from "../components/loading";
import { UserStore } from "../context/UserStore";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
    const { userData, thirdPartySignOn } = UserStore();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const imageURL = userData.picture;

    console.log("User from auth0", user);

    if (isLoading) {
        <div class="flex h-screen items-center justify-center">
               <Loading/>
        </div>
    }

    if (userData && !thirdPartySignOn && !isAuthenticated && !isLoading) {
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
    } else if (thirdPartySignOn && imageURL != null) {
        return (
            <div>
            <Nav/>
                <div class="w-full max-w-lg mx-auto mt-12">
                <p className="text-3xl text-center font-bold mb-6">Your Profile Page</p>
                    <div class="mx-auto mb-6 h-16 w-16 rounded-full overflow-hidden">
                        <img src={userData.picture} alt="Profile"/>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                First Name
                            </label>
                            <p>{userData.given_name}</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Last Name
                            </label>
                            <p>{userData.family_name}</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                                Username
                            </label>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if(isAuthenticated) {
        return (
            <div>
            <Nav/>
                <div class="w-full max-w-lg mx-auto mt-12">
                <p className="text-3xl text-center font-bold mb-6">Your Profile Page</p>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                                Email
                            </label>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Profile;

// Xiangrui@420