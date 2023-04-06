import React from 'react'

// The search bar component that is used in the nav bar
export default function Search(updateSearchQuery) {
    // Function that updates the search query when the user types in the search bar
    function handleChange(event) {
        updateSearchQuery(event.currentTarget.value);
      }

    return (
        <div className='py-6 px-2'>
            <div className=''>
                <input className='w-36 md:w-96 p-2 rounded-full border-black border-2' type='text' id='search-bar' placeholder='Search for a course title, number, or description' onChange={handleChange}/>
            </div>
        </div>
    )
}