import React from "react";

export default function InfoTable(props) {

  // Rendering the table with the team information
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{props.team.team_long_name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{props.team.team_api_id}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Short Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.team.team_short_name ? props.team.team_short_name : "None Specified"}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
