import React, {useEffect, useState, useContext} from "react";
import axios from "axios";

function Attackers(props) {

    console.log(props);

    const [attackers, setAttackers] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/team/teamAttributes/${props.teamid}/${props.seasons[props.currSeason][0]}`)
            .then((res) => {
                setAttackers(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props]);

    return (
        <div class="mt-12">
            <table class="w-4/5 divide-y divide-gray-200 mx-auto">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attacking Players</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player_API</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg_Overall_Rating</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                     </tr>
                 </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {attackers.map((attacker) => (
                        <tr>
                            <td class="px-6 py-5 whitespace-nowrap">{attacker.Player}</td>
                            <td class="px-6 py-5 whitespace-nowrap">{attacker.Player_API}</td>
                            <td class="px-6 py-5 whitespace-nowrap">{attacker.Position}</td>
                            <td class="px-6 py-5 whitespace-nowrap">{attacker.Avg_Overall_Rating}</td>  
                            <td class="px-6 py-5 whitespace-nowrap">{attacker.Year}</td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Attackers;
