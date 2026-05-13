// render.js handles all DOM manipulation related to rendering tasks on the page,
// including creating task elements, updating task status colours and displaying messages when there are no tasks to display.

const taskContainer = document.querySelector('#task-container');
// function to create and display "No Tasks to display" message when there are no tasks in the task list.
noTasksMessage = ()=>{
    //create and append message element to task list container
    const p = document.createElement('p');
    p.id = 'no-tasks';
    p.textContent = 'No Tasks To Display';
    taskContainer.appendChild(p);
}

//function to remove existing tasks or "no tasks to display" message from the DOM before rendering updated task list
removeMessage = () => {
    //check if no task message is present in the dom and remove it.
    if(taskContainer.contains(document.querySelector('#no-tasks'))){
        console.log('Removing existing "No Tasks To Display" message from DOM...');
        taskContainer.removeChild(document.querySelector('#no-tasks'));
    }
    // if there are existing tasks in the DOM, remove them before rendering updated task list
    else if(taskContainer.contains(document.querySelector('.task'))){
        console.log('Removing existing tasks from DOM...');
        const existingTasks = document.querySelectorAll('.task');
        // remove each existing task element from the DOM
        existingTasks.forEach(
            (task) =>{
                taskContainer.removeChild(task);
            });
    }
}

createTaskElement = (task, index, elementTag,  className) => {    
    //create task container element and data attribute for task index
    const element = document.createElement(elementTag);
    //if element is a label for created at or description, add specific class name for styling
    
    if(className){
        element.classList.add(className);
        
    }
    if(elementTag === 'select'){
        element.name = 'task-status';
    }
    element.dataset.index = index;
    return element;
}

insertTaskContent = (element, content) =>{
    if(element.classList.contains('task-created-at')){
        const label_p = document.createElement('p');
        label_p.innerHTML = '<i>Created At:</i>';
        
        const content_p = document.createElement('p');
        content_p.innerHTML = `<br>&emsp;<b>${content}</b></br>`;
        
        element.innerHTML = `${label_p.innerHTML} ${content_p.innerHTML}`;
    }
    else if(element.classList.contains('task-description')){
        const label_p = document.createElement('p');
        label_p.innerHTML = '<i>Description:</i>';
        
        const content_p = document.createElement('p');
        content_p.innerHTML = `<br>&emsp;<b>${content}</b></br>`;
        
        element.innerHTML = `${label_p.innerHTML} ${content_p.innerHTML}`;
    }
    else{
        element.textContent = content;
    }
}
createOptionsForSelectElement = (selectElement, validStatuses) =>{
    validStatuses.forEach(
        (statusOption) =>{
            const opt = document.createElement('option');
            opt.classList.add('status-option');
            opt.value = statusOption;
            opt.textContent = statusOption;            
            selectElement.appendChild(opt);
        });
}

setCurrentTaskStatus = (selectElement, currentStatus) =>{
    selectElement.value = currentStatus;
    if(selectElement.value === 'Not Started'){
        selectElement.style.backgroundColor = '#911818';
    }
    else if(selectElement.value === 'In Progress'){
        selectElement.style.backgroundColor = '#c8af0d';
    }
    else if(selectElement.value === 'Completed'){
        selectElement.style.backgroundColor = '#227022';
    }
}
//function to create and append task elements to the DOM based on the current task list
//each task element includes the task title, description, status dropdown and delete button
//task status dropdown is dynamically generated based on valid statuses defined in data.js and is pre-selected to the current task status
//elements are then appended to the task list container in the DOM
loadTasks = (tasks) => {
    tasks.forEach(
            (task, index) => {
                //task container
                const taskDiv = createTaskElement(task, index, 'div', 'task');
                //details and actions container
                const detailsAndActionsContainer = createTaskElement(task, index, 'div', 'details-and-actions');
                //seperator containers
                const divSeparatorTop = createTaskElement(task, index, 'div', 'separatorTop');
                const divSeparatorLeft = createTaskElement(task, index, 'div', 'separatorLeft');
                const divSeparatorRight = createTaskElement(task, index, 'div', 'separatorRight');
                //content elements
                const createdAtElement = createTaskElement(task, index, 'p', 'task-created-at');
                const titleElement = createTaskElement(task, index, 'h3', 'task-title');
                const descriptionElement = createTaskElement(task, index, 'p', 'task-description');
                //action elements
                const selectElement = createTaskElement(task, index, 'select', 'task-status');
                const deleteBtnElement = createTaskElement(task, index, 'button', 'deleteBtn');

                insertTaskContent(titleElement, task.title.toUpperCase());
                insertTaskContent(createdAtElement, task.start_ts);
                insertTaskContent(descriptionElement, task.description);
                insertTaskContent(deleteBtnElement, 'Delete');

                //create select options for task status dropdown based on valid statuses defined in data.js
                const validStatuses = getStatuses();
                createOptionsForSelectElement(selectElement, validStatuses);
                //set select element value to current task status and update background colour based on status
                setCurrentTaskStatus(selectElement, task.status);
                    
                taskContainer.appendChild(taskDiv);
                taskDiv.appendChild(divSeparatorTop);
                taskDiv.appendChild(detailsAndActionsContainer);
                detailsAndActionsContainer.appendChild(divSeparatorLeft);
                detailsAndActionsContainer.appendChild(divSeparatorRight);
                divSeparatorTop.appendChild(titleElement);
                divSeparatorLeft.appendChild(createdAtElement);
                divSeparatorLeft.appendChild(descriptionElement);
                divSeparatorRight.appendChild(selectElement);   
                divSeparatorRight.appendChild(deleteBtnElement);             

            });
}

//main function to render tasks on the page by retrieving tasks from data.js and calling loadTasks to create and display task elements in the DOM
function renderTasks(){
    event.preventDefault();
    //get tasks from data.js.
    const tasks = getTasks();
    //console.log(tasks);
    //check if tasks is null (i.e. no tasks in task list) and display "no tasks to display" message if true, otherwise call loadTasks to render tasks on the page
    if(tasks === null){
        removeMessage();
        noTasksMessage();
    }
    else{
        removeMessage();
        loadTasks(tasks);  
    }
}

//called form event.js when a change event is detected.
updateTaskStatusColours = (newStatus, target)=>{    
    if(target){
        switch(newStatus){
            case 'Not Started':
                target.style.backgroundColor = '#911818';
                break;
            case 'In Progress':
                target.style.backgroundColor = '#c8af0d';
                break;
            case 'Completed':
                target.style.backgroundColor = '#227022';
                break;
            default:
                target.style.backgroundColor = '#FFFFFF';
        }
    }
}

