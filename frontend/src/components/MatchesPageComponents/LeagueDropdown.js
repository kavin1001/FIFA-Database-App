import axios from "axios";
import React, {useEffect, useState, useContext} from "react";

const config = require('../../config.json')

function LeagueDropdown(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [drop, setDrop] = useState(false);
    const [dropText, setDropText] = useState('Leagues');
    
    const setLeague = props.setLeague;

    const route = `http://${config.server_host}:${config.server_port}/api/matches/leagueList`

    function wait() {
        setTimeout(() => {
            setLoading(false);
          }, 500);
    }

    function activate() {
        setDrop(!drop)
    }

    function changeLeague(leagueIndex) {
        if (leagueIndex != -1) {
            setLeague(data[leagueIndex].id)
        } else {
            setLeague(-1)
        }
    }

    useEffect(() => {
        axios
            .get(route)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                wait();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
    <>
        {
        loading ? 
        <div>
            <h1 className="font-bold text-5xl my-10 text-center">Loading...</h1>
        </div> 
        :
        <div>
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 
                    py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                    id="menu-button" aria-expanded="true" aria-haspopup="true"
                    onClick = {activate}
                    >
                    {dropText}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 
                        0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                    </button>
                </div>
            {/* <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
            <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white 
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
            transition ease-${drop ? 'out' : 'in'} duration-${drop ? '100' : '75'} 
            transform opacity-${drop ? '100' : '0'} scale-${drop ? '100' : '95'}`} 
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                    <a href='#' className="text-gray-700 block px-4 py-2 text-sm" 
                    role="menuitem" tabIndex="-1" id={`menu-item--1}`}
                    onClick = {() => {
                        changeLeague(-1)
                        setDropText("All")
                        activate()
                    }}
                    key = {-1}
                    >
                        All 
                    </a>
                    {
                    data.map((row, index) => 
                    <a href='#' className="text-gray-700 block px-4 py-2 text-sm" 
                    role="menuitem" tabIndex="-1" id={`menu-item-${index}`}
                    onClick = {() => {
                        changeLeague(`${index}`)
                        setDropText(`${row.name}`)
                        activate()
                    }}
                    key = {index}
                    >
                        {row.name}
                    </a>
                    )
                    }
                </div>
            </div>
            </div>
        </div>       
        }
    </>
    )
}

export default LeagueDropdown;