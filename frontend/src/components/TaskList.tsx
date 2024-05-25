import React from 'react';
import { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, setEditingTask }) => {
    return (
        <div>
            {tasks.map(task => (
                <div key={task.id} className="task-item">
                    <div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Due Date: {task.dueDate}</p>
                    </div>
                    <div>
                        <button onClick={() => setEditingTask(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
