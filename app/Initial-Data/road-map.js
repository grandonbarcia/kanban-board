const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Figure Out What You Want In Life',
      content:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
      subtasks: {},
      subtasksComplete: 0,
      subtasksIds: [],
    },
    'task-2': {
      id: 'task-2',
      title: 'Create A Written Vision For Your Life',
      content:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
      subtasks: {},
      subtasksIds: [],
    },
    'task-3': {
      id: 'task-3',
      title: 'Determine Your Life’s Purpose',
      content:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
      subtasks: {},
      subtasksIds: [],
    },
    'task-4': {
      id: 'task-4',
      title: 'Start Setting Goals ',
      content:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
      subtasks: {},
      subtasksIds: [],
    },
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
