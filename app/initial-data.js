const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Take out the garbage',
      subtasks: {
        'subtask-1': {
          id: 'subtask-1',
          content: 'Go Outside',
          status: false,
        },
        'subtask-2': {
          id: 'subtask-2',
          content: 'Throw Trash',
          status: false,
        },
      },
    },
    'task-2': { id: 'task-2', content: 'Watch my favorite show', subtasks: {} },
    'task-3': { id: 'task-3', content: 'Charge my phone', subtasks: {} },
    'task-4': { id: 'task-4', content: 'Cook dinner', subtasks: {} },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
