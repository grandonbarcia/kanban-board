import React from 'react';
import { useState, useEffect } from 'react';

export default function Modal({ data, setData }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState({});
  const [subtasksFields, addSubtaskField] = useState([
    'subtask-1',
    'subtask-2',
  ]);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showContentError, setShowContentError] = useState(false);

  function handleClick() {
    addSubtaskField((prevFields) => [
      ...prevFields,
      'subtask-' + (subtasksFields.length + 1),
    ]);
  }

  function isSubtask(property) {
    const subtask = 'subtask';
    const thisProperty = property.substring(0, 7);
    return subtask === thisProperty ? true : false;
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function ErrorMessage() {
    return (
      <div className="pt-3 pl-1 text-red-600">
        * Please fill out this field *
      </div>
    );
  }

  function handleSubtasks(e, property) {
    const value = e.target.value;

    if (value.length === 0) {
      setSubtasks((prevSubtasks) => {
        const currentData = { ...prevSubtasks };
        delete prevSubtasks[property];
        return { ...prevSubtasks };
      });
    } else {
      setSubtasks((prevSubtasks) => {
        return {
          ...prevSubtasks,
          [property]: { content: value, complete: false },
        };
      });
    }
  }

  function addNewTask() {
    const newTaskID = 'task-' + (Object.keys(data.tasks).length + 1);
    const subtasksID = Object.keys(subtasks);

    if (title.length === 0) {
      setShowTitleError(true);
    } else {
      setShowTitleError(false);
    }

    if (description.length === 0) {
      setShowContentError(true);
    } else {
      setShowContentError(false);
    }

    if (title.length === 0 || description.length === 0) {
      return;
    }

    const newTask = {
      title: title,
      content: description,
      subtasks: { ...subtasks },
      id: newTaskID,
      subtasksComplete: 0,
      subtasksIds: [...subtasksID],
    };

    const newTaskIdList = [...data.columns['column-1'].taskIds];

    newTaskIdList.push(newTaskID);

    setData((prevData) => {
      return {
        ...prevData,
        tasks: { ...prevData.tasks, [newTaskID]: { ...newTask } },
        columns: {
          ...prevData.columns,
          ['column-1']: {
            ...prevData.columns['column-1'],
            taskIds: [...newTaskIdList],
          },
        },
      };
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
    setSubtasks({});
    addSubtaskField(['subtask-1', 'subtask-2']);
  }

  return (
    <>
      <button
        className="bg-purple-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 pr-5 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add New Task
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 bg-gray-600 text-white p-6 rounded">
              {/*content*/}
              <div className="flex leading-9 justify-between text-xl font-bold">
                <h1 className="">Add New Task</h1>
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => {
                    setShowModal(false);
                    setTitle('');
                    setDescription('');
                    setSubtasks({});
                    addSubtaskField(['subtask-1', 'subtask-2']);
                  }}
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

              <div>
                <label
                  className="block  text-sm font-bold mb-2 pt-5"
                  for="username"
                >
                  Title
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-600"
                  id="title"
                  type="text"
                  placeholder="e.g Take Coffee Break"
                  onChange={(e) => handleTitle(e)}
                  required
                />
                {showTitleError ? <ErrorMessage /> : null}
              </div>
              <div>
                <label
                  for="content"
                  className="block text-sm font-bold mb-2 pt-5"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => handleDescription(e)}
                  id="content"
                  rows="4"
                  className="block p-2.5 w-full text-sm shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-600"
                  placeholder="e.g It is always good to take a 15 minute break. This break will recharge the batteries a little"
                  required
                ></textarea>
                {showContentError ? <ErrorMessage /> : null}
              </div>
              <div>
                <label
                  for="description"
                  className="block  text-sm font-bold mb-2 pt-5"
                >
                  Subtasks
                </label>

                {subtasksFields.map((field, index) => {
                  return (
                    <div className="flex" key={subtasksFields[index]}>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 bg-gray-600"
                        id={'subtask-' + (index + 1)}
                        type="text"
                        onChange={(e) =>
                          handleSubtasks(e, 'subtask-' + (index + 1))
                        }
                      />
                      <h1>X</h1>
                    </div>
                    // <SubTasksFields key={subtasksFields[index]} index={index} />
                  );
                })}

                <div>
                  <button
                    onClick={handleClick}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  mt-3"
                  >
                    + Add Subtask
                  </button>
                </div>
                <div>
                  <label
                    for="description"
                    className="block  text-sm font-bold mb-2 pt-5"
                  >
                    Status
                  </label>
                  <select
                    data-te-select-init
                    className="shadow  border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 bg-gray-600"
                  >
                    <option value="1">To Do</option>
                    <option value="2">In Progress</option>
                    <option value="3">Done</option>
                  </select>
                </div>
                <div>
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                    onClick={() => addNewTask()}
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
