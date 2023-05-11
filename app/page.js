'use client';

import Image from 'next/image';
import initialData from './initial-data';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import Column from './Components/Column';

export default function Home() {
  const [data, setData] = useState(initialData);
  return (
    <main>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const task = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={task} />;
      })}
    </main>
  );
}
