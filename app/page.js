'use client';

import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import initialData from './initial-data';
import Image from 'next/image';
import Column from './Components/Column';

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

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  }

  return (
    <main>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex ">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    </main>
  );
}
