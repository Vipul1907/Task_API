const express = require("express");

const { 
	allTask,
	specificTask,
	newTask,
    updateTask,
    deleteTask
} = require("../Controller/taskController");

const { authMiddleware } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, allTask);
router.get("/:id", authMiddleware, specificTask);
router.post("/", authMiddleware, newTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;


