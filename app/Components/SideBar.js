import React, { use } from 'react';
import { BiAbacus } from 'react-icons/bi';
import { MdOutlineBackupTable } from 'react-icons/md';
import { useState, useEffect } from 'react';
import ListOfBoards from './ListOfBoards';
import initialData from '../initial-data';
import emptyBoard from '../Initial-Data/empty-board';

export default function SideBar({
  activeBoard,
  setActiveBoard,
  boardNames,
  setBoardNames,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const [value, setValue] = useState('');

  function isEmpty(arr) {
    return arr.length ? true : false;
  }

  function createNewBoard() {
    if (value.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      localStorage.setItem(value, JSON.stringify(emptyBoard));
      setBoardNames((prevBoardNames) => [...prevBoardNames, value]);
      setValue('');
      setShowModal(false);
    }
  }

  useEffect(() => {
    if (!isEmpty(boardNames) || value === '') return;
    localStorage.setItem('Board Names', JSON.stringify(boardNames));
  }, [boardNames]);

  function ErrorMessage() {
    return (
      <div className="pt-3 pl-1 text-red-600">
        * Please fill out this field *
      </div>
    );
  }

  return (
    <div className="h-screen w-1/6 border-r bg-gray-600 text-white">
      <div className="h-1/6 flex items-center text-3xl font-extrabold p-10 ">
        <BiAbacus className=" mr-2" /> Kanban
      </div>
      <div className="h-5/6">
        <div className="flex pl-10 pt-2 pb-2">
          ALL BOARDS ( {boardNames.length} )
        </div>

        {boardNames.map((name) => {
          return (
            <ListOfBoards
              title={name}
              key={name}
              activeBoard={activeBoard}
              setActiveBoard={setActiveBoard}
            />
          );
        })}
        <div className="pl-10 pt-2 pb- text-purple-500">
          <button
            className="flex"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <MdOutlineBackupTable className="mr-2" /> + Create new Board
          </button>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-1/3 my-6 text-white bg-gray-600 p-6 rounded">
                  {/*content*/}

                  <div className="flex justify-between leading-9 text-xl font-bold">
                    <h1>Add New Board</h1>
                    <button
                      type="button"
                      class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      onClick={() => {
                        setValue('');
                        setShowModal(false);
                        setShowError(false);
                      }}
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
                      className="block text-white text-sm font-bold mb-2 pt-5"
                      for="username"
                    >
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="e.g Project Name"
                      onChange={(e) => {
                        setValue(e.currentTarget.value);
                      }}
                    />
                    {showError ? <ErrorMessage /> : null}
                  </div>

                  <div>
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                      onClick={createNewBoard}
                    >
                      Create Board
                    </button>
                  </div>
                </div>
              </div>

              <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
