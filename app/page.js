'use client';

import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { MdOutlineBackupTable } from 'react-icons/md';
import { BiAbacus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import initialData from './initial-data';
import Image from 'next/image';
import Column from './Components/Column';
import Modal from './Components/Modal';

export default function Home() {
  const [data, setData] = useState(initialData);

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

  return (
    <>
      <main className="flex">
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
            <div className="flex pl-10 pt-2 pb-2">
              <MdOutlineBackupTable className="mr-2" /> + Create new Board
            </div>
          </div>
        </div>
        <div className="w-screen">
          <div className="flex justify-between p-11 border-b-4">
            <div className="text-2xl">Platform Launch</div>
            <div className="flex items-center">
              <Modal />
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
                return <Column key={column.id} column={column} tasks={tasks} />;
              })}
            </div>
          </DragDropContext>
        </div>
      </main>
    </>
  );
}
