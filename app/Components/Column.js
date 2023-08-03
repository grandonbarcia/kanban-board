'use client';

import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { useRef } from 'react';

const CIRCLE_COLOR = {
  'To do':
    'w-4 h-4 rounded-full inline-flex items-center justify-center  text-gray-700 text-xl font-bold bg-cyan-400',
  'In Progress':
    'w-4 h-4 rounded-full inline-flex items-center justify-center  text-gray-700 text-xl font-bold bg-violet-400',
  Done: 'w-4 h-4 rounded-full inline-flex items-center justify-center  text-gray-700 text-xl font-bold bg-emerald-400',
};

export default function Column({ column, tasks, data, setData }) {
  return (
    <div className="flex flex-col m-8  rounded w-96">
      <div className="flex items-center p-8 text-zinc-400 font-bold">
        <div className={CIRCLE_COLOR[column.title]}></div>
        <div className="pl-5">{column.title.toUpperCase()}</div>
      </div>
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
            {tasks.map((task, index) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  subtasks={task.subtasks}
                  subtasksIds={task.subtasksIds}
                  subtasksComplete={task.subtasksComplete}
                  data={data}
                  setData={setData}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
