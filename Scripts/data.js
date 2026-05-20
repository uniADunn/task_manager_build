
// it ensures that all data for a task is valid before creating a new Task object adding it to the tasks array.
//it also provides functions to update task status, get all tasks, and delete tasks.
if (typeof module !== 'undefined') Task = require('./task'); // import the Task class from the task.js file if running in a Node.js environment.
//const Task = require('./task');
const tasks = []; // array to store tasks.
const validStatuses = ['Not Started', 'In Progress', 'Completed']; // valid statuses for task states.

//function to validate text input. it checks if the text is empty or not and if it contains only letters, numbers, and spaces.
//if the text is valid, it returns true. otherwise, it throws an error with a descriptive message.
validateText = (text) =>{
    // check if text is not empty.
    if(!text || text.trim() === ''){
        //check if text contains only letters, numbers, and spaces using a regular expression.
        throw new Error('text cannot be empty.');
    }
    if(text.match(/[^a-zA-Z0-9 ]/)){            
        throw new Error('text can only contain letters, numbers and spaces.');
    }
    return true;
}

//function to validate status input. it checks if the status is one of the valid statuses defined in the validStatuses array.
validateStatus = (status) => {
    //check if status is in the validStatuses array.
    if(validStatuses.includes(status)){
        //status is valid, return true.
        return true;
    }
    else{
        //status is invalid. return false and throw and error
        throw new Error('Invalid status.');
        return false;
    }
}

//function to add a new task to the tasks array. it takes title, description and status as parameters.
//it validates the input using the validateText and validateStatus functions.
//if the input is valid, it creates a new Task object and adds it to the tasks array.
//if the input is invalid, it catches the error and logs the error message to the console. (will give feedback to the user in the future.)
//returns true if the task was added successfully, false otherwise.
addTask = (title, description, status) => {
    try{
        //validate input and status choice. if any of the input is invalid, an error will be thrown and caught in the catch block.
        validateText(title);
        //console.log('title validated');
        validateText(description);
        //console.log('description validated');
        validateStatus(status);
        //console.log('status validated');
        console.log(`Validation successful. Creating Task...`);
        //create a new Task object and add it to the tasks array.
        const newTask = new Task(title, description, status);
        console.log('Task created');
        console.log(newTask.toString());
        //console.log('Adding Task to tasks array...');
        tasks.push(newTask);
        //console.log('Task added to tasks array');
        return true;
        
    } catch (error) {
        throw new Error(`Error adding task: ${error.message}`);
    }
};

//function to update the status of a task. it takes the index of the task in the tasks array and the new status as parameters.
//it validates the new status using the validateStatus function. if the new status is valid, it updates the status of the task at the specified index in the tasks array.
//if the new status is invalid, it catches the error and logs the error message to the console. (will give feedback to the user in the future.)
updateTaskStatus = (taskIndex, newStatus) => {
    try{
        //validate new status. if the new status is invalid, an error will be thrown and caught in the catch block.
        validateStatus(newStatus);
        //check if task index is valid. if the task index is valid, update the status of the task.
        if(taskIndex >= 0 && taskIndex < tasks.length){
            tasks[taskIndex].status = newStatus;
            console.log(`Task status updated: ${tasks[taskIndex].toString()}`);
            return true;
        }
    } 
    catch (error) {
        throw new Error(`Error updating task status: ${error.message}`);
    }
}

//function to get all valid statuses. it returns the validStatuses array.
getStatuses = () => {
    return validStatuses;
}
//function to get all tasks. it checks if the tasks array is empty.
//if its empty, it logs a message to the console and returns null. otherwise, it returns the tasks array.
getTasks = () => {
    return tasks;
    
}
// function to delete a task. it takes the index of the task in the tasks array as a parameter. it checks if the task index is valid.
//if valid, it deletes the task at the specified index from the tasks array. if the task index is invalid, it logs an error message to the console. (will give feedback to the user in the future.)
deleteTask = (taskIndex) =>{
    //check if task index is valid. if the task index is valid, delete the task at the specified index from the tasks array.
    if(taskIndex >= 0 && taskIndex < tasks.length){
        console.log(`Deleting task...`);
        const taskListDeleted = tasks.filter((task, index) => index !== taskIndex);
        tasks.length = 0; // Clear the original array
        //check if the task list is empty after deletion. if its empty, log a message to the console. otherwise, update the original array with the filtered tasks and log the updated task list to the console.
        if(taskListDeleted.length ===0){
            console.log('All tasks deleted. Task list is now empty.');
        }
        //task list is not empty, update the original array with the filtered tasks.
        else{
            console.log('Task deleted. Updated task list:');
            tasks.push(...taskListDeleted); // Update the original array with the filtered tasks
        }
    }
}
if(typeof module !== 'undefined') module.exports = {addTask, getTasks, updateTaskStatus, deleteTask, getStatuses, validateText, validateStatus};
