const form = document.querySelector('#taskForm');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const statusInput = document.querySelector('#status');
const submitbtn = document.querySelector('#submitBtn');
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM loaded. Rendering tasks...');
    renderTasks();
});

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const status = statusInput.value;
    console.log("heard new task submission: calling addTask from data.js ...");
    const taskAdded = addTask(title, description, status);
    if(taskAdded){
        renderTasks();
        console.log('Task added successfully.');
        // clear input fields
        titleInput.value = '';
        descriptionInput.value = '';
        statusInput.value = 'Not Started';
    }
    else{
        console.log('Failed to add task. Please check input values and try again.');
    }
});


const updateStatus = document.querySelector('#task-container');


updateStatus.addEventListener('change', (event)=>{
event.preventDefault();
const newStatus = event.target.value;
const taskIndex = Number(event.target.dataset.index);
console.log(`Task status changed to "${newStatus}". Index: ${taskIndex}. Updating task...`);
switch(newStatus){
    case 'Not Started':
        updateTaskStatus(taskIndex, newStatus);
        event.target.style.backgroundColor = '#911818';
        break;
    case 'In Progress':
        updateTaskStatus(taskIndex, newStatus);
        event.target.style.backgroundColor = '#c8af0d';
        break;
    case 'Completed':
        updateTaskStatus(taskIndex, newStatus);
        event.target.style.backgroundColor = '#227022';
        break;
    default:
        event.target.style.backgroundColor = '#FFFFFF';
    }

});
    
    


