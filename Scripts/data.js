const tasks = [];
const validStatuses = ['Not Started', 'In Progress', 'Completed'];

const validateText = (text) =>{
    if(text){
        if(!text.match(/[^a-zA-Z0-9 ]/)){            
            //console.log(`text validated: ${text}`);
            return true;
        }
        else{
            throw new Error('text can only contain letters, numbers, spaces.');            
        }
    }
    else{
        throw new Error('text cannot be empty.');
    }
}
const validateStatus = (status) => {
    if(validStatuses.includes(status)){
        return true;
    }
    else{
        throw new Error('Invalid status.');
    }
}

function addTask(title, description, status){
    try{
        validateText(title);
        //console.log('title validated');
        validateText(description);
        //console.log('description validated');
        validateStatus(status);
        //console.log('status validated');
        console.log(`Validation successful. Creating Task...`);

        const newTask = new Task(title, description, status);
        console.log('Task created');
        console.log(newTask.toString());
        console.log('Adding Task to tasks array...');
        tasks.push(newTask);
        console.log('Task added to tasks array');
        return true;
        
    } catch (error) {
        console.error(error.message);
        return false;
    }
};
updateTaskStatus = (taskIndex, newStatus) => {
    try{
        validateStatus(newStatus);
        if(taskIndex >= 0 && taskIndex < tasks.length){
            tasks[taskIndex].status = newStatus;
            console.log(`Task status updated: ${tasks[taskIndex].toString()}`);
        }
    } 
    catch (error) {
        console.error(error.message);
    }
}

getStatuses = () => {
    return validStatuses;
}
function getTasks(){
    if(tasks.length === 0){
        console.log('No tasks found.');
        return null;
    }
    else{
        return tasks;
    }
}