const express = require ('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// In-memory store for tasks
let tasks = [];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.status(200).json(task);
  }
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
  } else {
    const newTask = { id: String(tasks.length + 1), title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
  } else {
    tasks[taskIndex] = { ...tasks[taskIndex], title, description };
    res.status(200).json(tasks[taskIndex]);
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks.splice(taskIndex, 1);
    res.status(204).end();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});



app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
});