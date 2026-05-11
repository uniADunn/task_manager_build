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
            (task) => {
                //task container
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.style.backgroundColor = '#0B0D67';
                //seperator containers
                const divSepratorLeft = document.createElement('div');
                divSepratorLeft.classList.add('separatorLeft');
                taskDiv.appendChild(divSepratorLeft);

                const divSepratorMiddle = document.createElement('div');
                divSepratorMiddle.classList.add('separatorMiddle');
                taskDiv.appendChild(divSepratorMiddle);

                const divSepratorRight = document.createElement('div');
                divSepratorRight.classList.add('separatorRight');
                taskDiv.appendChild(divSepratorRight);
                //task content
                const title = document.createElement('h3');
                title.textContent = `${task.title.toUpperCase()}`;

                const description = document.createElement('p');
                description.innerHTML = `<span style="font-style:italic;">Description:&emsp;</span> ${task.description}`;

                const status = document.createElement('select');
                status.name = 'update-status';
                status.style.backgroundColor = '#0B0D67';
                status.options.backgroundColor = '#0B0D67';
                status.style.color = '#FFFFFF';
                status.classList.add('task-status');
                const validStatuses = getStatuses();
                validStatuses.forEach(
                    (statusOption) =>{
                        const opt = document.createElement('option');
                        opt.value = statusOption;
                        opt.textContent = statusOption;
                        opt.style.backgroundColor = '#FFFFFF';
                        opt.style.color= '#000000';
                        status.appendChild(opt);
                    });
                    status.value = task.status;
                    if(status.value === 'Not Started'){
                        status.style.backgroundColor = '#911818';
                    }
                    else if(status.value === 'In Progress'){
                        status.style.backgroundColor = '#c8af0d';
                    }
                    else if(status.value === 'Completed'){
                        status.style.backgroundColor = '#227022';
                    }
                
                divSepratorLeft.appendChild(title);
                divSepratorMiddle.appendChild(description);
                divSepratorRight.appendChild(status);
                tasklist.appendChild(taskDiv);
            });
            

}

function renderTasks(){
    event.preventDefault();
    const tasks = getTasks();
    //console.log(tasks);
    if(tasks === null){
        noTasksMessage();
    }
    else{
        removeMessage();
        loadTasks(tasks);
        
        
        
    }
}

