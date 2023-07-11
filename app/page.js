'use client';

import { DragDropContext } from 'react-beautiful-dnd';
import { useState, useEffect, use } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import initialData from './initial-data';
import Image from 'next/image';
import Column from './Components/Column';
import Modal from './Components/Modal';
import SideBar from './Components/SideBar';

export default function Home() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('data')) || initialData
  );

  function onDragEnd(result) {
    // Reorder our column
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  }

  useEffect(() => {
    console.log(data.listOfBoards);
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('Active Board', JSON.stringify(data.activeBoard));
    localStorage.setItem('Board Names', JSON.stringify(data.listOfBoardsNames));
  }, []);

  return (
    <>
      <main className="flex">
        <SideBar listOfBoards={data.listOfBoardsNames} />
        <div className="w-screen">
          <div className="flex justify-between p-11 border-b-4">
            <div className="text-2xl">Platform Launch</div>
            <div className="flex items-center">
              <Modal data={data} setData={setData} />
              <BsThreeDotsVertical size={32} />
            </div>
          </div>

          <DragDropContext className="relative" onDragEnd={onDragEnd}>
            <div className="flex relative">
              {data.columnOrder.map((columnId) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => data.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    data={data}
                    setData={setData}
                  />
                );
              })}
            </div>
          </DragDropContext>
        </div>
      </main>
    </>
  );
}
