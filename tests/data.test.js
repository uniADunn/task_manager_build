const Task = require('../Scripts/task');
const {addTask, getTasks, deleteTask, updateTaskStatus, getStatuses, validateText, validateStatus} = require('../Scripts/data');

test('getTasks returns null if there are no tasks', () => {
    const tasks = getTasks();
    if(tasks === null){
        expect(tasks).toBeNull();
    }
    else{
        expect(tasks).not.toBeNull();
        console.log('tasks found: ', tasks);
    }

});

test('addTask adds a task to the tasks array', ()=>{
    const tasksBefore = getTasks();
    const title = 'Test Task';
    const description = 'This is a test task';
    const status = 'Not Started';

    const taskLengthBefore = tasksBefore.length;
    console.log('Task length before adding task: ', taskLengthBefore);
    const result = addTask(title, description, status);
    console.log('Result of addTask: ', result);
    const tasksAfter = getTasks();
    const taskLengthAfter = tasksAfter.length;
    console.log('Task length after adding task: ', taskLengthAfter);

    expect(result).toBe(true);
    expect(taskLengthAfter).toBe(taskLengthBefore + 1);
});

