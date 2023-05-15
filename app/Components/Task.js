import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="p-2 mb-2 border-2 rounded "
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
