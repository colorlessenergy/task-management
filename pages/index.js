import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal/Modal';
import AddTask from '../shared/components/AddTask/AddTask';

import { getTasks } from '../shared/localStorage/task';

export default function Home () {
    const [ isAddTaskModalOpen, setIsAddTaskModalOpen ] = useState(false);
    const toggleAddTaskModal = () => {
        setIsAddTaskModalOpen(previousIsAddTaskModalOpen => !previousIsAddTaskModalOpen);
    }

    const [ tasks, setTasks ] = useState([]);
    useEffect(() => {
        setTasks(getTasks());
    }, typeof localStorage !== 'undefined' ? [localStorage.getItem('tasks')] : []);


    const getTagBackgroundColor = (tag) => {
        if (tag === 'urgent') {
            return 'background-color-red';
        } else if (tag === 'chill') {
            return 'backgroud-color-blue';
        }
    }

    let [ filterInput, setFilterInput ] = useState('');
    const handleFilterInputChange = (event) => {
        setFilterInput(event.target.value);
    }

    const filterTasks = (task) => {
        return task.title.includes(filterInput) || task.description.includes(filterInput) || task.tag.includes(filterInput);
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
                                className="card flex flex-direction-column p-1 b-1-black">
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

                                    <div className="square b-1-black"></div>
                                </div>
                            </div>
                        );
                    }) }
                </div>

                <Modal isOpen={ isAddTaskModalOpen } toggleModal={ toggleAddTaskModal }>
                    <AddTask toggleModal={ toggleAddTaskModal } />
                </Modal>
            </div>
        </div>
    );
}
