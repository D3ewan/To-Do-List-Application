import { Response, Request } from "express";

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string;
}

let tasks: Task[] = [];
let nextId = 1;

// Get all tasks
const getAllTasks = (req: Request, res: Response) => {
    res.json(tasks);
};

// Get a task by ID
const getParticularTask = (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
};

// Create a new task
const createTask = (req: Request, res: Response) => {
    const { title, description, status, dueDate } = req.body;
    const task: Task = { id: nextId++, title, description, status, dueDate };
    tasks.push(task);
    res.status(201).json(task);
};

// Update a task
const updateTask = (req: Request, res: Response) => {
    const { title, description, status, dueDate } = req.body;
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;
    res.json(task);
};

// Delete a task
const deleteTask = (req: Request, res: Response) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
};

export default { getAllTasks, getParticularTask, updateTask, deleteTask, createTask }
