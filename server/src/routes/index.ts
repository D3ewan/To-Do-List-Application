import express from "express";
const router = express.Router();
import controllers from '../controllers/index'

router.get('/tasks', controllers.getAllTasks);
router.get('/tasks/:id', controllers.getParticularTask);
router.post('/tasks', controllers.createTask);
router.put('/tasks/:id', controllers.updateTask);
router.delete('/tasks/:id', controllers.deleteTask);


export default router;