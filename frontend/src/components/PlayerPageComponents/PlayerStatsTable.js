import React from "react";
import SeasonSelector from "./SeasonSelector";

function StatisticsDashboard(props) {
    console.log("Props: ", props);

  return (
    <div className="px-6">
      <div className="bg-gray-100 p-12 rounded-full shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold ml-6 mx-2">Player Statistics</h1>
          <div className="justify-start mr-2">
            <p className="ml-2 font-bold">Season</p>
            <SeasonSelector 
                seasons={props.seasons}
                levels={props.levels} 
                setSeason = {props.setSeason} 
                setLoading = {props.setLoading}/>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Acceleration</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].acceleration}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Aggression</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].aggression}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Agility</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].agility}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Dribbling</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].dribbling}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Finishing</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].finishing}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Ball Control</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].ball_control}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 my-4">
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Attacking Work Rate</h3>
            <p className="text-xl">{props.playerAttributes[props.currSeason].attacking_work_rate}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Defensive Work Rate</h3>
            <p className="text-xl">{props.playerAttributes[props.currSeason].defensive_work_rate}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Preferred Foot</h3>
            <p className="text-xl">{props.playerAttributes[props.currSeason].preferred_foot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsDashboard;
