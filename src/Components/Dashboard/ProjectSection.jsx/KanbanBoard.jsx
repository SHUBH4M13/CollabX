import React, { useState } from 'react';
import { Plus, Calendar, User, Flag, MoreHorizontal, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: '1',
        title: 'Design new user interface',
        description: 'Create mockups for the new dashboard layout',
        priority: 'high',
        assignee: 'Sarah Chen',
        dueDate: '2025-07-05',
        tags: ['Design', 'UI/UX']
      },
      {
        id: '2',
        title: 'Research competitor analysis',
        description: 'Analyze top 5 competitors and their features',
        priority: 'medium',
        assignee: 'Mike Johnson',
        dueDate: '2025-07-10',
        tags: ['Research', 'Analysis']
      },
      {
        id: '3',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated deployment workflow',
        priority: 'high',
        assignee: 'David Kim',
        dueDate: '2025-07-03',
        tags: ['DevOps', 'Automation']
      }
    ],
    inprogress: [
      {
        id: '4',
        title: 'Implement user authentication',
        description: 'Add login, signup and password reset functionality',
        priority: 'high',
        assignee: 'Alex Rodriguez',
        dueDate: '2025-07-08',
        tags: ['Backend', 'Security']
      },
      {
        id: '5',
        title: 'Write API documentation',
        description: 'Document all REST API endpoints',
        priority: 'medium',
        assignee: 'Emma Wilson',
        dueDate: '2025-07-12',
        tags: ['Documentation', 'API']
      }
    ],
    completed: [
      {
        id: '6',
        title: 'Setup project repository',
        description: 'Initialize Git repo with proper structure',
        priority: 'low',
        assignee: 'John Doe',
        dueDate: '2025-06-25',
        tags: ['Setup', 'Git']
      },
      {
        id: '7',
        title: 'Define project requirements',
        description: 'Gather and document all project requirements',
        priority: 'high',
        assignee: 'Lisa Park',
        dueDate: '2025-06-20',
        tags: ['Planning', 'Requirements']
      }
    ]
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: []
  });

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    },
    {
      id: 'completed',
      title: 'Completed',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    }
  ];

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask({ task, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedTask || draggedTask.sourceColumn === targetColumn) {
      setDraggedTask(null);
      return;
    }

    const newTasks = { ...tasks };
    
    // Remove task from source column
    newTasks[draggedTask.sourceColumn] = newTasks[draggedTask.sourceColumn].filter(
      task => task.id !== draggedTask.task.id
    );
    
    // Add task to target column
    newTasks[targetColumn] = [...newTasks[targetColumn], draggedTask.task];
    
    setTasks(newTasks);
    setDraggedTask(null);
  };

  const addTask = (columnId) => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      ...newTask,
      tags: newTask.tags.length > 0 ? newTask.tags : ['General']
    };

    setTasks(prev => ({
      ...prev,
      [columnId]: [...prev[columnId], task]
    }));

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    setShowAddTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-neutral-500';
    }
  };

  const TaskCard = ({ task, columnId }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task, columnId)}
      className="bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-xl p-5 cursor-move hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)} flex-shrink-0 mt-1 shadow-lg`}></div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="text-white font-semibold mb-3 line-clamp-2 text-lg">{task.title}</h3>
      <p className="text-neutral-400 text-sm mb-4 line-clamp-3 leading-relaxed">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-neutral-800/80 text-neutral-300 text-xs rounded-full border border-neutral-700 hover:border-neutral-600 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="font-medium">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const AddTaskForm = ({ columnId }) => (
    <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 space-y-3">
      <input
        type="text"
        placeholder="Task title..."
        value={newTask.title}
        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-400 focus:border-orange-500 focus:outline-none"
      />
      
      <textarea
        placeholder="Task description..."
        value={newTask.description}
        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-400 focus:border-orange-500 focus:outline-none resize-none h-20"
      />
      
      <div className="grid grid-cols-2 gap-3">
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
        />
      </div>
      
      <input
        type="text"
        placeholder="Assignee name..."
        value={newTask.assignee}
        onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-400 focus:border-orange-500 focus:outline-none"
      />
      
      <div className="flex gap-2">
        <button
          onClick={() => addTask(columnId)}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Task
        </button>
        <button
          onClick={() => setShowAddTask(null)}
          className="px-4 py-2 border border-neutral-700 text-neutral-400 rounded-lg hover:text-white hover:border-neutral-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Project Kanban Board
            </span>
          </h1>
          <p className="text-neutral-400">Manage your tasks with drag-and-drop simplicity</p>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
          <div className="md:hidden flex gap-4 pb-4">
            {/* Mobile horizontal scroll hint */}
            <div className="text-sm text-neutral-400 whitespace-nowrap">← Swipe to see all columns →</div>
          </div>
        </div>
        
        {/* Desktop/Tablet Column Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 min-h-[600px] w-full"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${column.bgColor} ${column.color} border ${column.borderColor}`}>
                    {column.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{column.title}</h2>
                    <span className="text-sm text-neutral-400">{tasks[column.id].length} {tasks[column.id].length === 1 ? 'task' : 'tasks'}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowAddTask(column.id)}
                  className="p-3 text-neutral-400 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/30 border border-neutral-700 rounded-xl transition-all duration-300 group"
                  title="Add new task"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                {tasks[column.id].map((task) => (
                  <TaskCard key={task.id} task={task} columnId={column.id} />
                ))}
                
                {/* Add Task Form */}
                {showAddTask === column.id && (
                  <AddTaskForm columnId={column.id} />
                )}
              </div>

              {/* Drop Zone Indicator */}
              {tasks[column.id].length === 0 && showAddTask !== column.id && (
                <div className="flex items-center justify-center h-48 border-2 border-dashed border-neutral-700 rounded-xl text-neutral-500 hover:border-neutral-600 hover:bg-neutral-800/30 transition-all duration-300">
                  <div className="text-center">
                    <div className={`mx-auto mb-3 p-3 rounded-full ${column.bgColor} ${column.color}`}>
                      {column.icon}
                    </div>
                    <p className="text-sm font-medium">Drop tasks here</p>
                    <p className="text-xs text-neutral-600 mt-1">or click + to add new</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Stacked Layout */}
        <div className="md:hidden space-y-6">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 w-full"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${column.bgColor} ${column.color} border ${column.borderColor}`}>
                    {column.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{column.title}</h2>
                    <span className="text-sm text-neutral-400">{tasks[column.id].length} {tasks[column.id].length === 1 ? 'task' : 'tasks'}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowAddTask(column.id)}
                  className="p-3 text-neutral-400 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/30 border border-neutral-700 rounded-xl transition-all duration-300 group"
                  title="Add new task"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                {tasks[column.id].map((task) => (
                  <TaskCard key={task.id} task={task} columnId={column.id} />
                ))}
                
                {/* Add Task Form */}
                {showAddTask === column.id && (
                  <AddTaskForm columnId={column.id} />
                )}
              </div>

              {/* Drop Zone Indicator */}
              {tasks[column.id].length === 0 && showAddTask !== column.id && (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-neutral-700 rounded-xl text-neutral-500 hover:border-neutral-600 hover:bg-neutral-800/30 transition-all duration-300">
                  <div className="text-center">
                    <div className={`mx-auto mb-3 p-3 rounded-full ${column.bgColor} ${column.color}`}>
                      {column.icon}
                    </div>
                    <p className="text-sm font-medium">Drop tasks here</p>
                    <p className="text-xs text-neutral-600 mt-1">or click + to add new</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-400 mb-2">{tasks.todo.length}</div>
            <div className="text-neutral-400 text-sm font-medium">To Do Tasks</div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(tasks.todo.length / Object.values(tasks).flat().length) * 100}%` }}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 text-center hover:border-orange-500/40 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-400 mb-2">{tasks.inprogress.length}</div>
            <div className="text-neutral-400 text-sm font-medium">In Progress</div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(tasks.inprogress.length / Object.values(tasks).flat().length) * 100}%` }}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center hover:border-green-500/40 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">{tasks.completed.length}</div>
            <div className="text-neutral-400 text-sm font-medium">Completed</div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(tasks.completed.length / Object.values(tasks).flat().length) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default KanbanBoard;