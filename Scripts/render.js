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
                let taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.style.backgroundColor = '#0B0D67';

                let divSepratorLeft = document.createElement('div');
                divSepratorLeft.classList.add('separatorLeft');
                taskDiv.appendChild(divSepratorLeft);

                let divSepratorMiddle = document.createElement('div');
                divSepratorMiddle.classList.add('separatorMiddle');
                taskDiv.appendChild(divSepratorMiddle);

                let divSepratorRight = document.createElement('div');
                divSepratorRight.classList.add('separatorRight');
                taskDiv.appendChild(divSepratorRight);

                let title = document.createElement('h3');
                title.textContent = `${task.title.toUpperCase()}`;

                let description = document.createElement('p');
                description.innerHTML = `<span style="font-style:italic;">Description:&emsp;</span> ${task.description}`;
                
                let status = document.createElement('p');
                status.innerHTML = `<span style="font-style:italic;">Status:&emsp;</span>${task.status}`;


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

