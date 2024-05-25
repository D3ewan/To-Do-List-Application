import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css'
import { Task } from './types';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    const createTask = async (task: Omit<Task, 'id'>) => {
        const response = await axios.post('http://localhost:5000/api/tasks', task);
        setTasks([...tasks, response.data]);
    };

    const updateTask = async (task: Task) => {
        const response = await axios.put(`http://localhost:5000/api/tasks/${task.id}`, task);
        const updatedTasks = tasks.map(t => (t.id === task.id ? response.data : t));
        setTasks(updatedTasks);
    };

    const deleteTask = async (id: number) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <TaskForm
                createTask={createTask}
                updateTask={updateTask}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
            />
        </div>
    );
};

export default App;
