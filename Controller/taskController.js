const asyncHandler = require("express-async-handler");

const allTask = asyncHandler(async (req, res) => {
    try{
		const listOfAllTask = await Category.find();
		res.json(listOfCategory);
	}catch(error){
		throw new Error("No categories Found");
	}
});

module.exports =
{
	allTask,
	specificTask,
	newTask,
    updateTask,
    deleteTask
}