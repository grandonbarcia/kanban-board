import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

const bgWhite = 'p-2 mb-2 border-2 bg-white ';
const bgGreen = 'p-2 mb-2 border-2 bg-green-400 ';

const lineThrough =
  'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 line-through';
const noLineThrough =
  'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300';

export default function Task({
  task,
  index,
  subtasks,
  subtasksIds,
  subtasksComplete,
  data,
  setData,
}) {
  const [showModal, setShowModal] = useState(false);

  function SubtasksTrackerForModal() {
    return (
      <div>
        Subtasks {subtasksComplete} / {subtasksIds.length}
      </div>
    );
  }

  function SubtasksTrackerForColumn() {
    return (
      <div>
        {subtasksComplete} of {subtasksIds.length} subtasks
      </div>
    );
  }

  function handleClick(event, subtask) {
    const currentStatus = data.tasks[task.id].subtasks[subtask].complete;
    const newStatus = !currentStatus;
    let count = data.tasks[task.id].subtasksComplete;
    if (newStatus) count++;

    if (!newStatus) {
      if (count !== 0) {
        count--;
      }
    }

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [task.id]: {
          ...data.tasks[task.id],
          subtasksComplete: count,
          subtasks: {
            ...data.tasks[task.id].subtasks,
            [subtask]: {
              ...data.tasks[task.id].subtasks[subtask],
              complete: newStatus,
            },
          },
        },
      },
    };

    setData(newState);
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            // className={snapshot.isDragging ? bgGreen : bgWhite}
            className="bg-gray-600 text-white p-2 mb-2 border-2 rounded "
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex justify-between  ">
              <div>
                <div>{task.title}</div>
                <div>
                  {subtasksIds.length != 0 ? (
                    <SubtasksTrackerForColumn />
                  ) : null}
                </div>
              </div>
              <div className="my-auto">
                <button
                  type="button"
                  className="text-white border border-white hover:bg-violet-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                  onClick={() => setShowModal(true)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 bg-white p-6 rounded">
              {/*content*/}

              <div className="flex justify-between leading-9 text-2xl font-bold mb-5">
                <h1>{task.title}</h1>
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setShowModal(false)}
                >
                  <span className="sr-only">Close menu</span>

                  <svg
                    className="h-6 w-6"
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
              <div className="pb-5">
                <h2>{task.content}</h2>
              </div>
              <div className="pb-3">
                {subtasksIds.length != 0 ? <SubtasksTrackerForModal /> : null}
              </div>

              <div>
                {subtasksIds.map((subtask) => {
                  const content = subtasks[subtask].content;
                  const complete = subtasks[subtask].complete;

                  return (
                    <div
                      className="flex items-center mb-4 p-3 bg-slate-200 "
                      key={subtask}
                    >
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        onClick={() => handleClick(event, subtask, task)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={complete}
                        onChange={(e) => {}}
                      />
                      <label
                        for="default-checkbox"
                        className={complete ? lineThrough : noLineThrough}
                      >
                        {content}
                      </label>
                    </div>
                    // <div>
                    //   {content}
                    //   {complete ? 'true' : 'false'}
                    // </div>
                  );
                })}
              </div>
              <div>
                <div>
                  <label
                    for="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="US">To Do</option>
                    <option value="CA">Doing</option>
                    <option value="FR">Done</option>
                  </select>
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
