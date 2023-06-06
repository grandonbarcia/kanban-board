import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const bgWhite = 'p-2 mb-2 border-2 bg-white ';
const bgGreen = 'p-2 mb-2 border-2 bg-green-400 ';

export default function Task({ task, index, subtasks }) {
  console.log(Object.keys(subtasks).length);
  console.log(subtasks);
  const numOfSubtasks = Object.keys(subtasks).length;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? bgGreen : bgWhite}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>{task.content}</div>
          <div>0/{numOfSubtasks} Subtasks</div>
        </div>
      )}
    </Draggable>
  );
}
