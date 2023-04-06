import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppRoot";

export default function InfoTable({course}: {course:any}) {

  // Local state variables to store the data fetched from the API
  const [message, setMessage] = useState('Loading data...');
  const [courseQuality, setCourseQuality] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [work, setWork] = useState(0);

  const {year, semester} = useContext(AppContext);

  const url = `/api/base/${year+semester}/courses/${course.dept}-${course.number}/`;

// Calling the async function in the UseEffect hook to fetch the data and set it to the states maintained in AppRoot
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/base/${year + semester}/courses/${course.dept}-${course.number}/`);
      if(!response.ok) setMessage("Information not available for the current semester");
      const json = await response.json();
      setDifficulty(json.difficulty);
      setWork(json.work_required);
      setCourseQuality(json.course_quality)
      console.log(url);
    };
    fetchData();
  }, [course, semester, url, year]);

  // Rendering the table with the course information
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{course.dept + ' ' + course.number + " : " + year + semester}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{course.title}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Prerequisites</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{course.prereqs ? course.prereqs.join(" ") : "None"}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Cross Listings</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{course['cross-listed'] ? course['cross-listed'].join(" ") : "None"}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Course Quality</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{courseQuality ? courseQuality : message}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {difficulty ? difficulty : message}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Work Required </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{work ? work : message}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {course.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
