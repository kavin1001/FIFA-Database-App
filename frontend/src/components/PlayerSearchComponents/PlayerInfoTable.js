import React from "react";

export default function InfoTable(props) {

  // Rendering the table with the player information
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{props.player.player_name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{props.player.player_api_id}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Birthday</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.player.birthday ? props.player.birthday : "None Specified"}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Height</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.player.height ? props.player.height : "None Specified"}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Weight</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {props.player.weight ? props.player.weight : "None Specified"}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> FIFA API ID </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.player.player_fifa_api_id ? props.player.player_fifa_api_id : "None Specified"}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
