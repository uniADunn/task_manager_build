// render.js handles all DOM manipulation related to rendering tasks on the page,
// including creating task elements, updating task status colours and displaying messages when there are no tasks to display.

const tasklist = document.querySelector('#task-container');// container element for task list

// function to create and display "No Tasks to display" message when there are no tasks in the task list.
noTasksMessage = ()=>{
    //create and append message element to task list container
    const p = document.createElement('p');
    p.id = 'no-tasks';
    p.textContent = 'No Tasks To Display';
    tasklist.appendChild(p);
}

//function to remove existing tasks or "no tasks to display" message from the DOM before rendering updated task list
removeMessage = () => {
    //check if no task message is present in the dom and remove it.
    if(tasklist.contains(document.querySelector('#no-tasks'))){
        console.log('Removing existing "No Tasks To Display" message from DOM...');
        tasklist.removeChild(document.querySelector('#no-tasks'));
    }
    // if there are existing tasks in the DOM, remove them before rendering updated task list
    else if(tasklist.contains(document.querySelector('.task'))){
        console.log('Removing existing tasks from DOM...');
        const existingTasks = document.querySelectorAll('.task');
        // remove each existing task element from the DOM
        existingTasks.forEach(
            (task) =>{
                tasklist.removeChild(task);
            });
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
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.dataset.index = index;
                taskDiv.style.backgroundColor = '#0B0D67';
                //seperator containers
                const divSeperatorTop = document.createElement('div');
                divSeperatorTop.classList.add('separatorTop');
                taskDiv.appendChild(divSeperatorTop);

                //task content
                const title = document.createElement('h3');
                title.textContent = `${task.title.toUpperCase()}`;
                taskDiv.appendChild(divSeperatorTop);
                divSeperatorTop.appendChild(title);

                const divDetailsAndActionsContainer = document.createElement('div');
                divDetailsAndActionsContainer.classList.add('details-and-actions');
                taskDiv.appendChild(divDetailsAndActionsContainer);

                
                const divSeperatorLeft = document.createElement('div');
                divSeperatorLeft.classList.add('separatorLeft');
                taskDiv.appendChild(divSeperatorLeft);

                const divSeperatorRight = document.createElement('div');
                divSeperatorRight.classList.add('separatorRight');
                taskDiv.appendChild(divSeperatorRight);

                
                //description element with italicized "Description:" label and line break before description text
                const description = document.createElement('p');
                description.innerHTML = `<span style="font-style:italic;">Description:</span><br> ${task.description}.`;

                const createdAt = document.createElement('p');
                createdAt.innerHTML = `<span style="font-style:italic;">Created At:</span> ${task.start_ts}.`;

                //select element for task status with options generated from valid statuses defined in data.js and pre-selected to current task status
                const select = document.createElement('select');
                select.name = 'update-status';
                select.style.backgroundColor = '#0B0D67';
                select.options.backgroundColor = '#0B0D67';
                select.style.padding = '10px';
                select.style.border = 'none';
                select.style.color = '#FFFFFF';
                select.classList.add('task-status');
                select.dataset.index = index;
                //get statuses from data.js and create option element for each status, appending them to the select element
                const validStatuses = getStatuses();
                validStatuses.forEach(
                    (statusOption) =>{
                        const opt = document.createElement('option');
                        opt.value = statusOption;
                        opt.textContent = statusOption;
                        opt.style.backgroundColor = '#FFFFFF';
                        opt.style.color= '#000000';
                        select.appendChild(opt);
                    });
                    //set select element value to current task status and update background colour based on status
                    select.value = task.status;
                    if(select.value === 'Not Started'){
                        select.style.backgroundColor = '#911818';
                    }
                    else if(select.value === 'In Progress'){
                        select.style.backgroundColor = '#c8af0d';
                    }
                    else if(select.value === 'Completed'){
                        select.style.backgroundColor = '#227022';
                    }
                //delete button element with styling and data attribute for task index
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('deleteBtn');
                deleteBtn.style.backgroundColor = '#911818';
                deleteBtn.style.color = '#FFFFFF';
                deleteBtn.style.padding = '10px 30px';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '5px';
                
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.dataset.index = index;

                //append task content elements to their respective separator containers and append separator containers to task container,
                //then append task container to task list container in the DOM
                
                divSeperatorLeft.appendChild(createdAt);
                divSeperatorLeft.appendChild(description);
                divSeperatorRight.appendChild(select);
                divSeperatorRight.appendChild(deleteBtn);
                divDetailsAndActionsContainer.appendChild(divSeperatorLeft);
                divDetailsAndActionsContainer.appendChild(divSeperatorRight);
                tasklist.appendChild(taskDiv);
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

