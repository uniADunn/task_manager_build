
const data = require('../Scripts/data');
beforeEach(()=>{
    //clear tasks array before each test to ensure tests are independent and do not affect each other with shared state.
    const tasks = data.getTasks();
    if(tasks !== null){
        tasks.length = 0;;
    }
});
test('text validation works correctly', () => {
    //valid text should not throw an error
    expect(() => validateText('valid text')).not.toThrow();
    //string with numbers
    expect(() => validateText('this has 123 numbers')).not.toThrow();
    //empty string should throw an error
    expect(() => validateText('')).toThrow();
    //string with only spaces should throw an error
    expect(() => validateText('   ')).toThrow();
    //string with invalid characters should throw an error
    expect(() => validateText('this has # ; invalid characters')).toThrow();
});

test('status validation works correctly', () => {
    //valid statuses should not throw an error
    expect(() => validateStatus('Not Started')).not.toThrow();
    expect(() => validateStatus('In Progress')).not.toThrow();
    expect(() => validateStatus('Completed')).not.toThrow();
    //invalid status should throw an error
    expect(() => validateStatus('Invalid Status')).toThrow();
});



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

test('updateTaskStatus updates the status of a task', ()=>{
    const title = 'Test task for status update';
    const description = 'This task is for testing status updates';
    const status = 'Not Started';
    const result = addTask(title, description, status);
    const tasks = getTasks();
    const taskIndex = tasks.length - 1;

    const newStatus = 'In Progress';
    updateTaskStatus(taskIndex, newStatus);
    const updatedTasks = getTasks();
    const updatedTask = updatedTasks[taskIndex];
    console.log('Updated task: ', updatedTask);
    expect(updatedTask.status).toBe(newStatus);
});
test('updateTaskStatus does not update status if new status is invalid', ()=>{
    const title = 'Test task for invalid status update';
    const description = 'This task is for testing invalid status updates';
    const status = 'invalid status update';
    const taskAdded = addTask(title, description, 'Not Started');
    
    const taskList = getTasks();
    const taskIndex = taskList.length - 1;
    const invalidStatus = 'Invalid Status';

    expect(() => updateTaskStatus(taskIndex, invalidStatus)).toThrow();

    const tasks = getTasks();
    
    expect(tasks[tasks.length - 1].status).toBe('Not Started');    
});

test('getStatuses returns the valid statuses array', ()=>{
    const statuses = getStatuses();
    expect(statuses).toEqual(['Not Started', 'In Progress', 'Completed']);
});
test('deleteTask removes a task from the tasks array', ()=>{
    
    const title = 'Test task for deletion';
    const description = 'This task is for testing deletion';
    const status = 'Not Started';
    addTask(title, description, status);
    const tasksBefore = getTasks();
    const taskIndex = tasksBefore.length - 1;
    deleteTask(taskIndex);
    const tasksAfter = getTasks();
    expect(tasksAfter.length).toBe(tasksBefore.length);
    const deletedTask = tasksAfter.find(task => task.title === title && task.description === description);
    expect(deletedTask).toBeUndefined();
});
