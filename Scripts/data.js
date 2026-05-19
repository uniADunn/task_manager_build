// data.js handles the data management for the task manager application.
// it ensures that all data for a task is valid before creating a new Task object adding it to the tasks array.
//it also provides functions to update task status, get all tasks, and delete tasks.


const tasks = []; // array to store tasks.
const validStatuses = ['Not Started', 'In Progress', 'Completed']; // valid statuses for task states.

//function to validate text input. it checks if the text is empty or not and if it contains only letters, numbers, and spaces.
//if the text is valid, it returns true. otherwise, it throws an error with a descriptive message.
const validateText = (text) =>{
    // check if text is not empty.
    if(text){
        //check if text contains only letters, numbers, and spaces using a regular expression.
        if(!text.match(/[^a-zA-Z0-9 ]/)){            
            //text is valid, return true.
            return true;
        }
        //text is invalid.
        else{
            throw new Error('text can only contain letters, numbers, spaces.');
            return false;
        }
    }
    //text is empty.
    else{
        throw new Error('text cannot be empty.');
        return false;
    }
}

//function to validate status input. it checks if the status is one of the valid statuses defined in the validStatuses array.
const validateStatus = (status) => {
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
function addTask(title, description, status){
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
        throw new Error(error.message);
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
        alert(error.message);
        return false;
    }
}

//function to get all valid statuses. it returns the validStatuses array.
getStatuses = () => {
    return validStatuses;
}
//function to get all tasks. it checks if the tasks array is empty.
//if its empty, it logs a message to the console and returns null. otherwise, it returns the tasks array.
function getTasks(){
    //check if tasks array is empty.
    if(tasks.length === 0){
        console.log('No tasks found.');
        return null;
    }
    //tasks array is not empty, return the tasks array.
    else{
        return tasks;
    }
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
