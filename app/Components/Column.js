'use client';

import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { useRef } from 'react';

export default function Column({ column, tasks }) {
  return (
    <div className="flex flex-col m-8  rounded w-96">
      <div className="p-8">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={
              'p-8 grow h-96 ' +
              (snapshot.isDraggingOver ? 'bg-blue-200' : 'bg-white-500')
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
