export const getTasks = () => {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }

    if (!localStorage.getItem('ID')) {
        localStorage.setItem('ID', JSON.stringify(0));
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