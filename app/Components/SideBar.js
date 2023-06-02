import React from 'react';
import { BiAbacus } from 'react-icons/bi';
import { MdOutlineBackupTable } from 'react-icons/md';
import { useState } from 'react';

export default function SideBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-screen w-1/6 border-r-4">
      <div className="flex text-3xl font-extrabold p-10 ">
        <BiAbacus className="mr-2" /> Kanban
      </div>
      <div className="">
        <div className="flex pl-10 pt-2 pb-2">ALL BOARDS (8)</div>
        <div className="flex w-11/12 pl-10 pt-2 pb-2 bg-purple-500 text-white rounded-r-3xl">
          <MdOutlineBackupTable className="mr-2" /> Platform Launch
        </div>
        <div className="flex pl-10 pt-2 pb-2">
          <MdOutlineBackupTable className="mr-2" /> Marketing Plan
        </div>
        <div className="flex pl-10 pt-2 pb-2">
          <MdOutlineBackupTable className="mr-2" /> Roadmap
        </div>
        <div className=" pl-10 pt-2 pb- text-purple-500">
          <button
            className="flex"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <MdOutlineBackupTable className="mr-2" /> + Create new Board
          </button>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/3 my-6 bg-white p-6 rounded">
                  {/*content*/}
                  <div className="text-xl font-bold">
                    <h1>Add New Board</h1>
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
                      placeholder="e.g Project Name"
                    />
                  </div>

                  <div>
                    <button
                      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                      onClick={() => setShowModal(false)}
                    >
                      Create Board
                    </button>
                  </div>
                </div>
              </div>

              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
