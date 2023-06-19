import React from 'react';
import { useState } from 'react';

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [subtasksFields, addSubtaskField] = useState([
    'subtask-1',
    'subtask-2',
  ]);

  function handleClick() {
    addSubtaskField((prevFields) => [
      ...prevFields,
      'subtask-' + (subtasksFields.length + 1),
    ]);
  }

  function SubTasksFields() {
    return (
      <div className="flex">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          id="title"
          type="text"
          placeholder="e.g Take Coffee Break"
        />
        <h1>X</h1>
      </div>
    );
  }
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add New Task
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 bg-white p-6 rounded">
              {/*content*/}
              <div className="flex leading-9 justify-between text-xl font-bold">
                <h1>Add New Task</h1>
                <button
                  type="button"
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setShowModal(false)}
                >
                  <span class="sr-only">Close menu</span>

                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 pt-5"
                  for="username"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="e.g Take Coffee Break"
                />
              </div>
              <div>
                <label
                  for="description"
                  className="block text-gray-700 text-sm font-bold mb-2 pt-5"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  class="block p-2.5 w-full text-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g It is always good to take a 15 minute break. This break will recharge the batteries a little"
                ></textarea>
              </div>
              <div>
                <label
                  for="description"
                  className="block text-gray-700 text-sm font-bold mb-2 pt-5"
                >
                  Subtasks
                </label>

                {subtasksFields.map((field, index) => {
                  return <SubTasksFields key={subtasksFields[index]} />;
                })}

                <div>
                  <button
                    onClick={handleClick}
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  mt-3"
                  >
                    + Add Subtask
                  </button>
                </div>
                <div>
                  <label
                    for="description"
                    className="block text-gray-700 text-sm font-bold mb-2 pt-5"
                  >
                    Status
                  </label>
                  <select
                    data-te-select-init
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  >
                    <option value="1">To Do</option>
                    <option value="2">In Progress</option>
                    <option value="3">Done</option>
                  </select>
                </div>
                <div>
                  <button
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                    onClick={() => setShowModal(false)}
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
