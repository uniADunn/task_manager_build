const tasklist = document.querySelector('#task-container');

noTasksMessage = ()=>{
    const p = document.createElement('p');
    p.id = 'no-tasks';
    p.textContent = 'No Tasks To Display';
    tasklist.appendChild(p);
}
removeMessage = () => {
    if(tasklist.contains(document.querySelector('#no-tasks'))){
        console.log('Removing existing "No Tasks To Display" message from DOM...');
        tasklist.removeChild(document.querySelector('#no-tasks'));
    }
    else if(tasklist.contains(document.querySelector('.task'))){
        console.log('Removing existing tasks from DOM...');
        const existingTasks = document.querySelectorAll('.task');
        existingTasks.forEach(
            (task) =>{
                tasklist.removeChild(task);
            });
    }
}
loadTasks = (tasks) => {
    tasks.forEach(
            (task, index) => {
                //task container
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.dataset.index = index;
                taskDiv.style.backgroundColor = '#0B0D67';
                //seperator containers
                const divSeperatorLeft = document.createElement('div');
                divSeperatorLeft.classList.add('separatorLeft');
                taskDiv.appendChild(divSeperatorLeft);

                const divSeperatorMiddle = document.createElement('div');
                divSeperatorMiddle.classList.add('separatorMiddle');
                taskDiv.appendChild(divSeperatorMiddle);

                const divSeperatorRight = document.createElement('div');
                divSeperatorRight.classList.add('separatorRight');
                taskDiv.appendChild(divSeperatorRight);
                //task content
                const title = document.createElement('h3');
                title.textContent = `${task.title.toUpperCase()}`;
                

                const description = document.createElement('p');
                description.innerHTML = `<span style="font-style:italic;">Description:&emsp;</span><br> ${task.description}.`;

                const select = document.createElement('select');
                select.name = 'update-status';
                select.style.backgroundColor = '#0B0D67';
                select.options.backgroundColor = '#0B0D67';
                select.style.padding = '10px';
                select.style.border = 'none';
                select.style.color = '#FFFFFF';
                select.classList.add('task-status');
                select.dataset.index = index;
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

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('deleteBtn');
                deleteBtn.style.backgroundColor = '#911818';
                deleteBtn.style.color = '#FFFFFF';
                deleteBtn.style.padding = '10px 30px';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '5px';
                deleteBtn.style.margin = '5px 5px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.dataset.index = index;

                
                divSeperatorLeft.appendChild(title);
                divSeperatorMiddle.appendChild(description);
                divSeperatorRight.appendChild(select);
                divSeperatorRight.appendChild(deleteBtn);
                tasklist.appendChild(taskDiv);
            });
}

function renderTasks(){
    event.preventDefault();
    const tasks = getTasks();
    //console.log(tasks);
    if(tasks === null){
        removeMessage();
        noTasksMessage();
    }
    else{
        removeMessage();
        loadTasks(tasks);  
    }
}

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

