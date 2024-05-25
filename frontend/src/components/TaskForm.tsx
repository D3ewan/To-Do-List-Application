import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormProps {
    createTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (task: Task) => void;
    editingTask: Task | null;
    setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ createTask, updateTask, editingTask, setEditingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Task['status']>('pending');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
            setDueDate(editingTask.dueDate);
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const task = { title, description, status, dueDate };
        if (editingTask) {
            updateTask({ ...task, id: editingTask.id });
            setEditingTask(null);
        } else {
            createTask(task);
        }
        setTitle('');
        setDescription('');
        setStatus('pending');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value as Task['status'])}
                required
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
                required 
            />
            <button type="submit">{editingTask ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default TaskForm;
