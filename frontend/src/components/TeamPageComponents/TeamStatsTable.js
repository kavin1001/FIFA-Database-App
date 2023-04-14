import React from "react";
import SeasonSelector from "./TeamSeasonSelector";

function StatisticsDashboard(props) {
  return (
    <div className="px-6">
      <div className="bg-gray-100 p-12 rounded-full shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold ml-6 mx-2">Team Statistics</h1>
          <div className="justify-start mr-2 mx-2">
            <p className="ml-2 font-bold">Season</p>
            <SeasonSelector 
                seasons={props.seasons}
                levels={props.levels} 
                setSeason = {props.setSeason} 
                setLoading = {props.setLoading}/>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Build Up Speed</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].buildUpPlaySpeed}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Build Up Dribbling</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].buildUpPlayDribbling}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Build Up Passing</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].buildUpPlayPassing}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Defence Aggression</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].defenceAggression}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Defence Pressure</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].defencePressure}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-6 my-10">
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Chance Creation Passing</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].chanceCreationPassing}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Chance Creation Crossing</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].chanceCreationCrossing}</p>
          </div>
          <div className="p-6 bg-white rounded-full shadow">
            <h3 className="text-md font-bold mb-2">Chance Creation Shooting</h3>
            <p className="text-xl font-bold">{props.playerAttributes[props.currSeason].chanceCreationShooting}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsDashboard;
