import React, { useContext } from 'react';
import { AppContext } from './AppRoot';
import Course from './Player';

export default function Courses(searchString) {

// Redifining the type of searchString from object to string
if(typeof searchString === 'object'){
  searchString = '';
}
  

  // The global difficulty state that is set in the DifficultyFilter component
  const {difficulty, courses} = useContext(AppContext);

// console.log(courses);
// console.log(typeof searchString);

  // Displayed courses is updated based on the search string such that the conditions are met
  const displayedCourses = courses.filter((c) => c.player_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || 
    c.number.toString().indexOf(searchString) !== -1 ||
    c.description.indexOf(searchString) !== -1
  )

  // Same logic as before but by course level or difficulty
  const filteredCoursesByDiff = courses.filter((c) => {
      if (c.number >= difficulty) {
        return true;
      }
    return false
  })

  // Display only the ones that show up in both
  let filteredCourses = displayedCourses.filter(value => filteredCoursesByDiff.includes(value));


  return (
    <div>
      <div className='mx-auto mb-12 h-full w-5/6 items-center justify-between'>
        <div className='flex flex-row justify-between'>
          {/* <div>
            <SemSelector />
          </div> */}
          {/* <div>
            <DifficultyFilter />
          </div> */}
        </div>
        <div className='grid gap-4 grid-cols-3'>
          {displayedCourses.map((c) => (
            <Course 
              key={c.id}
              dept={''}
              number={c.player_api_id}
              title={c.player_name}
              description={''}
            />
          ))}
        </div>
      </div>
    </div>
  )
}