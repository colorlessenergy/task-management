export const getTasks = () => {
    if (!localStorage.getItem('ID')) {
        localStorage.setItem('ID', JSON.stringify(0));
    }

    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));

        createTask({
            title: 'get groceries',
            description: '2 bananas, 5 can of beans and 1 bag of oranges',
            tag: 'chill',
            isDone: false
        });
    }

    return JSON.parse(localStorage.getItem('tasks'));
}

export const createTask = (task) => {
    let ID = JSON.parse(localStorage.getItem('ID'));
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    ID += 1;
    task = {
        ID,
        ...task
    };
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('ID', JSON.stringify(ID));
}

export const setTask = (updatedTask) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskIndex = tasks.findIndex(task => task.ID === updatedTask.ID);
    tasks[taskIndex] = updatedTask;

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const deleteTask = (taskID) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskIndex = tasks.findIndex(task => task.ID === taskID);
    tasks.splice(taskIndex, 1)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}