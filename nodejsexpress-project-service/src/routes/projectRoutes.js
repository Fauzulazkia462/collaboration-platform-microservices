const express = require('express');
const router = express.Router();

const controller = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// CREATE
router.post('/', controller.createProject);
router.post('/task', controller.createTask);

// READ
router.get('/', controller.getAllProjects);
router.get('/owner/:ownerId', controller.getProjectsByOwner);
router.get('/tasks', controller.getAllTasks);
router.get('/tasks/project/:projectId', controller.getTasksByProject);
router.get('/tasks/assignee/:assignee', controller.getTasksByAssignee);

module.exports = router;