beforeEach(() => {
    document.body.innerHTML = `
        <form id="taskForm">
            <input id="title" type="text" />
            <textarea id="description"></textarea>
            <select id="status">
                <option value="Not Started">Not Started</option>
            </select>
            <button id="submitBtn" type="submit">Add Task</button>
        </form>
        <div id="task-container"></div>
    `;
    jest.resetModules();
});

test('form submit calls addTask with input values', () => {
    const mockAddTask = jest.fn().mockReturnValue(true);
    const mockRenderTasks = jest.fn();

    addTask = mockAddTask;
    renderTasks = mockRenderTasks;
    getTasks = () => [];
    getStatuses = () => ['Not Started', 'In Progress', 'Completed'];

    require('../Scripts/event');

    document.querySelector('#title').value = 'My Task';
    document.querySelector('#description').value = 'Some description';

    document.querySelector('#taskForm').dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
    );

    expect(mockAddTask).toHaveBeenCalledWith('My Task', 'Some description', 'Not Started');
});

test('delete button click calls deleteTask with correct index', () => {
    const mockDeleteTask = jest.fn();
    const mockRenderTasks = jest.fn();

    deleteTask = mockDeleteTask;
    renderTasks = mockRenderTasks;

    // manually add a fake delete button to the container
    document.querySelector('#task-container').innerHTML = 
        `<button class="deleteBtn" data-index="0">Delete</button>`;

    require('../Scripts/event');

    document.querySelector('.deleteBtn').click();

    expect(mockDeleteTask).toHaveBeenCalledWith(0);
});