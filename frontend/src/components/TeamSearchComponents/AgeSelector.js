import { Fragment, useContext, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { AppContext } from './TeamRoot';
import axios from 'axios';

const levels = [
    { id: 0, name: 'See All', key: 0 },
    { id: 20, name: '>20', key: 1},
    { id: 30, name: '>30', key: 2 },
    { id: 40, name: '>40', key: 3 },
    { id: 50, name: '>50', key: 4 },
]

export default function DifficultyFilter(props) {
  const [selected, setSelected] = useState(levels[0])

  useEffect(() => {
    props.setAge(selected.id);
  }, [selected.id])


  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative flex justify-center mr-4">
            <p className='mt-2 mr-2 justify-center'>Age Filter: </p>
            <Listbox.Button className="relative w-48 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {levels.map((level) => (
                  <Listbox.Option
                  key={level.key}
                  className={({ active }) =>
                      active ? "text-white bg-blue-600" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                  }
                  value={level}
                >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                        <span
                            className={
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            }
                          >
                            {level.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                          className={
                            active ? "text-white" : "text-blue-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          }
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}