const form = document.querySelector('#taskForm');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const statusInput = document.querySelector('#status');
const submitbtn = document.querySelector('#submitBtn');


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const status = statusInput.value;
    const newTask = new Task(title, description, status);
    console.log("heard new task submission:");
    console.log(newTask);
    const taskAdded = addTask(title, description, status);
    if(taskAdded){
        console.log('Task added successfully.');
        // clear input fields
        titleInput.value = '';
        descriptionInput.value = '';
        statusInput.value = 'Not Started';
    }
    else{
        console.log('Failed to add task. Please check input values and try again.');
    }
})