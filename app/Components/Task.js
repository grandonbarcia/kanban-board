import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const bgWhite = 'p-2 mb-2 border-2 bg-white ';
const bgGreen = 'p-2 mb-2 border-2 bg-green-400 ';

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? bgGreen : bgWhite}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}
