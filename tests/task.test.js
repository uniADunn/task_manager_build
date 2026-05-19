const Task = require('../Scripts/task');
const statuses = ['Not Started', 'In Progress', 'Completed'];


test('Task is created with correct title', () => {
    const task = new Task('Test Task', 'this is a test task', 'Not Started');
    expect(task.title).toBe('Test Task');
});

test('Task is created with correct Description', () => {
    const task = new Task('Test Task', 'this is a test task', 'Not Started');
    expect(task.description).toBe('this is a test task');
});

test('Task is created with Correct Status', () => {
    const task = new Task('Test Task', 'this is a test task', 'Not Started');
    expect(statuses).toContain(task.status);
});

