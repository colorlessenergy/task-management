import { useEffect, useReducer, useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal/Modal';
import AddOrEditTask from '../shared/components/AddOrEditTask/AddOrEditTask';

import { getTasks, setTask } from '../shared/localStorage/task';

export default function Home () {
    const [ isAddTaskModalOpen, setIsAddTaskModalOpen ] = useState(false);
    const toggleAddTaskModal = () => {
        setIsAddTaskModalOpen(previousIsAddTaskModalOpen => !previousIsAddTaskModalOpen);
    }

    const [ isEditTaskModalOpen, setIsEditTaskModalOpen ] = useState(true);
    const toggleEditTaskModal = (task) => {
        setViewTask(task)
        setEditTask(null);
        setIsEditTaskModalOpen(previousIsEditTaskModalOpen => !previousIsEditTaskModalOpen);
    }

    const [ editTask, setEditTask ] = useState(null)
    const openEditTaskModal = (task) => {
        setEditTask(task);
        setIsEditTaskModalOpen(true);
    }

    const [ tasks, setTasks ] = useState([]);
    useEffect(() => {
        setTasks(getTasks());
    }, typeof localStorage !== 'undefined' ? [localStorage.getItem('tasks')] : []);

    const getTagBackgroundColor = (tag) => {
        if (tag === 'urgent') {
            return 'background-color-red';
        } else if (tag === 'chill') {
            return 'background-color-blue';
        }
    }

    let [ filterInput, setFilterInput ] = useState('');
    const handleFilterInputChange = (event) => {
        setFilterInput(event.target.value);
    }

    const filterTasks = (task) => {
        return task.title.includes(filterInput) || task.description.includes(filterInput) || task.tag.includes(filterInput);
    }

    const setTaskToDone = (event, selectedTaskID) => {
        event.stopPropagation();

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let taskID = tasks.findIndex(task => task.ID === selectedTaskID);
        tasks[taskID].isDone = !tasks[taskID].isDone;

        setTask(tasks[taskID]);
        forceUpdate();
    }

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [ isViewTaskModalOpen, setIsViewTaskModalOpen ] = useState(false);
    const toggleViewTaskModal = () => {
        setIsViewTaskModalOpen(previousIsViewTaskModalOpen => !previousIsViewTaskModalOpen);
    }

    const [ viewTask, setViewTask ] = useState(null)
    const openViewTaskModal = (task) => {
        setViewTask(task);
        setIsViewTaskModalOpen(true);
    }

    return (
        <div>
            <Head>
                <title>task management</title>
                <meta name="description" content="task management" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <Nav toggleAddTaskModal={ toggleAddTaskModal } />

                <div className="text-center my-1">
                    <input
                        type="text"
                        placeholder="filter..."
                        value={ filterInput }
                        onChange={ handleFilterInputChange }
                        className="filter-input" />
                </div>

                <div className="cards-container">
                    { tasks
                        .filter(filterTasks)
                        .map(task => {
                        return (
                            <div
                                key={ task.ID }
                                onClick={ () => openViewTaskModal(task) }
                                className={`card flex flex-direction-column p-1 b-1-black transition-3-ease-in-out ${ task.isDone ? ("opacity-5") : ("") }`}>
                                <div className="flex justify-content-between align-items-center">
                                    <div className="text-3">
                                        { task.title }
                                    </div>

                                    <div className="square background-color-black"></div>
                                </div>

                                <p className="card__text m-0 mb-auto text-2">
                                    { task.description }
                                </p>

                                <div className="flex justify-content-between align-items-center">
                                    <div className={`flex justify-content-center align-items-center tag rounded ${ getTagBackgroundColor(task.tag) }`}>
                                        { task.tag }
                                    </div>

                                    <button
                                        className={`square b-1-black ${ task.isDone === true ? ("background-color-orange") : ("") }`}
                                        onClick={ (event) => setTaskToDone(event, task.ID) }></button>
                                </div>
                            </div>
                        );
                    }) }
                </div>

                { isAddTaskModalOpen ? (
                    <Modal isOpen={ isAddTaskModalOpen } toggleModal={ toggleAddTaskModal }>
                        <AddOrEditTask
                            title="create task"
                            submitButtonText="create"
                            toggleModal={ toggleAddTaskModal } />
                    </Modal>
                ) : (null) }


                { viewTask ? (
                    <Modal isOpen={ isViewTaskModalOpen } toggleModal={ toggleViewTaskModal }>
                        <div className="text-3">
                            { viewTask.title }
                        </div>

                        <p className="card__text m-0 mb-2 text-2">
                            { viewTask.description }
                        </p>

                        <div className="flex align-items-center mb-auto">
                            <div className={`flex justify-content-center align-items-center tag rounded ${ getTagBackgroundColor(viewTask.tag) }`}>
                                { viewTask.tag }
                            </div>
                        </div>

                        <div className="flex justify-content-between">
                            <button className="button background-color-pink">delete</button>
                            <button
                                onClick={ () => openEditTaskModal(viewTask) }
                                className="button background-color-green">edit</button>
                        </div>
                    </Modal>
                ) : (null) }

                { editTask ? (
                    <Modal isOpen={ isEditTaskModalOpen } toggleModal={ toggleEditTaskModal }>
                        <AddOrEditTask
                            title="edit task"
                            submitButtonText="edit"
                            selectedTask={ editTask }
                            toggleModal={ toggleEditTaskModal } />
                    </Modal>
                ) : (null) }
            </div>
        </div>
    );
}
