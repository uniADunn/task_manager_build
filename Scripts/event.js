// event.js this file will handle all event listeners and interactions with the DOM.
// it will listen for form submissions, task status changes, and delete button clicks, and call the appropriate functions from data.js
// to update the task list and re-render the tasks on the page.


const form = document.querySelector('#taskForm'); //form element for adding new tasks
const titleInput = document.querySelector('#title');//input element for task title
const descriptionInput = document.querySelector('#description');//input element for task description
const statusInput = document.querySelector('#status');//input element for task status
const submitbtn = document.querySelector('#submitBtn');//button element for submitting new tasks

// listen for DOM content loaded event to render tasks on page load
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM loaded. Rendering tasks...');
    renderTasks();
});

//listen for form submission to add new task
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // get input values and call addTask function from data.js
    const title = titleInput.value;
    const description = descriptionInput.value;
    const status = statusInput.value;
    console.log("heard new task submission: calling addTask from data.js ...");
    // add task and re-render tasks on page
    try{
        const taskAdded = addTask(title, description, status);
        if(taskAdded){
            renderTasks();
            console.log('Task added successfully.');
            // clear input fields
            titleInput.value = '';
            descriptionInput.value = '';
            statusInput.value = 'Not Started';
        }
        // if task was not added successfully, log an error message
        else{
            console.log('Failed to add task. Please check input values and try again.');
        }
    }
    catch(error){
        console.error('Error adding task:', error);
    }
});

// listen for change events on task status dropdowns to update task status
const taskList = document.querySelector('#task-container'); //container element for task list
// use event delegation to listen for change events on dynamically generated dropdowns
taskList.addEventListener('change', (event)=>{
    // get new status value and task index from the data attribute
    const newStatus = event.target.value; // get the new status value from the dropdown
    const taskIndex = Number(event.target.dataset.index);// get the task index from the data attribute of the dropdown

    console.log(`Task status changed to "${newStatus}". Index: ${taskIndex}. Updating task...`);
    // call update task status function from data.js and update task status colours based on new status
    switch(newStatus){
        case 'Not Started':
            updateTaskStatus(taskIndex, newStatus);
            updateTaskStatusColours(newStatus, event.target);        
            break;
        case 'In Progress':
            updateTaskStatus(taskIndex, newStatus);
            updateTaskStatusColours(newStatus, event.target);
            break;
        case 'Completed':
            updateTaskStatus(taskIndex, newStatus);
            updateTaskStatusColours(newStatus, event.target);
            break;
        default:
            console.log(`invalid status value: ${newStatus}. No action taken.`);
        }
});
// use event delegation to listen for click events on dynamically generated delete buttons
taskList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('deleteBtn')){
        const taskIndex = Number(event.target.dataset.index);
        console.log(`Delete button clicked for task index: ${taskIndex}. Deleting task...`);
        deleteTask(taskIndex);
        renderTasks();
    }
});

    
    


