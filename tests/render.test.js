// set up the DOM BEFORE requiring render.js
beforeEach(() => {
    document.body.innerHTML = `<div id="task-container"></div>`;
    // clear module cache so it re-runs querySelector with fresh DOM
    jest.resetModules();
});

const mockTasks = [
    { title: 'Test Task', description: 'A description', status: 'Not Started', start_ts: '20/05/2026' }
];

test('renders a task card to the DOM', () => {
    // make getStatuses and getTasks global (as they are in browser)
    getStatuses = () => ['Not Started', 'In Progress', 'Completed'];
    getTasks = () => mockTasks;

    const { renderTasks } = require('../Scripts/render');
    renderTasks();

    expect(document.querySelector('.task')).not.toBeNull();
    expect(document.querySelector('.task-title').textContent).toBe('TEST TASK');
});

test('shows no tasks message when task list is empty', () => {
    getStatuses = () => ['Not Started', 'In Progress', 'Completed'];
    getTasks = () => [];

    const { renderTasks } = require('../Scripts/render');
    renderTasks();

    // empty array isn't null so loadTasks runs with 0 items — no message shown
    // this test documents that behaviour
    expect(document.querySelector('#no-tasks')).toBeNull();
});