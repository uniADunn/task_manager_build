
const data = require('../Scripts/data');

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



