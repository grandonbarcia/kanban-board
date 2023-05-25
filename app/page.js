'use client';

import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { MdOutlineBackupTable } from 'react-icons/md';
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
        <div className="w-1/6">
          <div className="text-3xl text-center p-10 font-extrabold">Kanban</div>
          <div className="flex">
            <MdOutlineBackupTable /> All Boards
          </div>
          <div className="flex">
            <MdOutlineBackupTable /> Platform Launch
          </div>
          <div className="flex">
            <MdOutlineBackupTable /> Marketing Plan
          </div>
          <div className="flex">
            <MdOutlineBackupTable /> Roadmap
          </div>
          <div className="flex">
            <MdOutlineBackupTable /> + Create new Board
          </div>
        </div>
        <div className="">
          <div className="flex justify-between p-11">
            <div className="text-2xl">Platform Launch</div>
            <div>
              <Modal />
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
