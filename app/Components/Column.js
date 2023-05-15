'use client';

import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { useRef } from 'react';

export default function Column({ column, tasks }) {
  return (
    <div className="m-8 border-2 rounded">
      <div className="p-8">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="p-8"
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
